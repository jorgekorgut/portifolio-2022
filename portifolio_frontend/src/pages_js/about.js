import {Navigation} from '../index.js';
import {GetData} from '../assets/js/communication.js'

import '../pages_css/about.css'
import '../assets/css/components.css'
import '../assets/js/communication.js'

export function About(props){

	let generalError = false;
	let error;

	let educationTitle;
	[educationTitle, error] = GetData("api/education-info");

	let educations;
	[educations, error] = GetData("api/educations?populate=*");

	let about;
	[about, error] = GetData('api/abouts?populate=*');

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

	let component = (
		<div className = "card_container_about card_container">
			{
			data.map((d)=>(
				<div key={d.id} className='card card_about'>
					<div className="card_element card_element_about description">
						<div className="title title_about"><strong> {d.attributes.Title} </strong> </div>
						{d.attributes.Description}
					</div>
					{
						
						d.attributes.Images.data != null &&
						<div className="card_element card_element_about images">
							{
								d.attributes.Images.data.map((image)=>(
									<img key={d.id} src={"http://localhost:1337"+image.attributes.url}></img>
									)) 
							}
						</div>
					}
				</div>
				))}
		</div>
	);
	return component;
}

function CardEducation(props){
	let data = props.data;
	let title = props.title;

	let component = (
		<div className = "card card_about">
			<div className='card_element card_element_about full_width'>
			{
				title.attributes != undefined &&
				<div className="title title_about"> <strong>{title.attributes.Title}</strong> : &lt;{title.attributes.Domain}&gt; <strong>{title.attributes.StudyLevel}</strong></div>
			}
			{
				data != undefined && 
				data.map((d)=>(
				<div key={d.id} className='card_row'>
					<div className="university">{d.attributes.University}</div>
					<div className="Years">{d.attributes.Years}</div>
				</div>
				))
			}
			</div>
		</div>
	);
	return component;
}
