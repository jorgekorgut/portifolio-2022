import { useState , useEffect } from 'react';

import {Navigation} from './index.js';


import './about.css'

const parseJSON = (resp) => (resp.json ? resp.json() : resp);

const checkStatus = (resp) => {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }

  return parseJSON(resp).then(resp => {
    throw resp;
  });
};

export function About(props){

	let [error, setError] = useState(null);
	let generalError = error;

	const [educationTitle, setEducationTitle] = useState([]);

	const [educations, setEducations] = useState([]);

	const [about, setAbout] = useState([]);

	useEffect(() => {
		fetch('http://localhost:1337/api/education-info',{ method: 'GET', headers: {'Content-Type': 'application/json'}})
		.then(checkStatus)
		.then(parseJSON)
		.then(({data}) => setEducationTitle(data))
		.catch((error) => setError(error));
	},[]);

	if(error){
		generalError = error;
	}

	useEffect(() => {
		fetch('http://localhost:1337/api/educations?populate=*',{ method: 'GET', headers: {'Content-Type': 'application/json'}})
		.then(checkStatus)
		.then(parseJSON)
		.then(({data}) => setEducations(data))
		.catch((error) => setError(error));
	},[]);

	if(error){
		generalError = error;
	}

	useEffect(() => {
		fetch('http://localhost:1337/api/abouts?populate=*',{ method: 'GET', headers: {'Content-Type': 'application/json'}})
		.then(checkStatus)
		.then(parseJSON)
		.then(({data}) => setAbout(data))
		.catch((error) => setError(error));
	},[]);

	if(error){
		generalError = error;
	}
	
	let component = (
				<>
					<Navigation highlight='about'/>
					<CardAbout data={about}/>
					<CardEducation data={educations} title={educationTitle}/>
				</>
		);
	return component; 
 	
}

function CardAbout(props){
	let data = props.data;
	//console.log(data);

	let component = (
		<div className = "card_about">
			{
			data.map((d)=>(
				<div key={d.id} className='information'>
					<div className="card Description">{d.attributes.Description}</div>
					<div className="card Images">
						{
							d.attributes.Images.data.map((image)=>(
								<div key={image.id}className="single_image about_image">
									<img src={"http://localhost:1337"+image.attributes.url}></img>
								</div>
								)) 
						}
					</div>
				</div>
				))}
		</div>
	);
	return component;
}

function CardEducation(props){
	let data = props.data;
	let title = props.title;
	console.log(props);

	let component = (
		<div className = "card card_education">
			{
				title.attributes !== undefined &&
				<div className="title title_education"> <strong>{title.attributes.Title}</strong> : &lt;{title.attributes.Domain}&gt; <strong>{title.attributes.StudyLevel}</strong></div>
			}
			{
				data.map((d)=>(
				<div key={d.id} className='information'>
					<div className="university">{d.attributes.University}</div>
					<div className="Years">{d.attributes.Years}</div>
				</div>
				))}
		</div>
	);
	return component;
}
