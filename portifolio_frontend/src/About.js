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
	const [educations, setEducations] = useState([]);

	const [about, setAbout] = useState([]);

	useEffect(() => {
		fetch('http://localhost:1337/api/educations',{ method: 'GET', headers: {'Content-Type': 'application/json'}})
		.then(checkStatus)
		.then(parseJSON)
		.then(({data}) => setEducations(data))
		.catch((error) => setError(error));
	},[]);

	if(error){
		generalError = error;
	}

	useEffect(() => {
		fetch('http://localhost:1337/api/abouts',{ method: 'GET', headers: {'Content-Type': 'application/json'}})
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
					<CardEducation data={educations}/>
				</>
		);
	return component; 
 	
}

function CardAbout(props){
	let data = props.data;
	console.log(data);

	let component = (
		<div className = "card card_about">
			{
				data.map((d)=>(
				<div key={d.id} className='information'>
					<div className="Description">{d.attributes.Description}</div>
				</div>
				))}
		</div>
	);
	return component;
}

function CardEducation(props){
	let data = props.data;
	console.log(data);

	let component = (
		<div className = "card card_education">
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
