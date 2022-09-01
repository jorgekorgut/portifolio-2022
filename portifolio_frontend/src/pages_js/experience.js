import { useState , useEffect } from 'react';

import {Navigation} from '../index.js';

import {GetData, useFetch} from '../assets/js/communication.js'

import '../pages_css/experience.css'
import '../assets/css/components.css'
import { Loading } from './loading.js';
import Transitions from '../assets/js/transition.js';

function filterMapByYear(map, y){
	return map.filter(({attributes})=> attributes.Year === y);
}

function findEveryYear(map){
	let everyYear = [];
	for(let element of map){
		if(!everyYear.includes(element.attributes.Year)){
			everyYear.push(element.attributes.Year);	
		}
	}
	return everyYear;
}

export function Experience(props){

	[window.experienceLoading, window.experienceError, window.experienceData] = useFetch("api/experiences?populate=*&sort=Year%3Adesc");
	
	if (window.experienceError) {
		return <p>Error.</p>;
	  }
	
	if (window.experienceLoading) {
		return <Loading></Loading>;
	}

	let experience = window.experienceData.data;
	let everyYear = findEveryYear(experience);

	return (<Transitions className="transition">
			<Navigation highlight='experience'/>
			{
				everyYear.map((currentYear) => {
					return (
						<div key={currentYear} className='year_container card_container'>
						{
							filterMapByYear(experience, currentYear).map((exp,expIndex)=>(
							<div key={exp.id} className="card card_experience">
								{
									expIndex===0 &&
									<div className='year year_box'>{currentYear}</div>

								}
								{
									expIndex!==0 &&
									<div className='year_box'></div>
								}
								{
									<div className='card_element card_element_experience full_width'>
										<div className='title title_experience'><strong>{exp.attributes.Title}</strong></div>
										<div className='description'>{exp.attributes.Description}</div>
										<div className='footer_duration'>{exp.attributes.Duration}</div>
									</div>
								}
								{
									exp.attributes.Images.data !=null &&
									exp.attributes.Images.data.map((image)=>(
										<div key={image.id} className="card_element card_element_experience images">
											<img src={"http://localhost:1337"+image.attributes.url}></img>
										</div>
										)) 
								}
							</div>
							))
						}
						</div>
					)
				})
			}
	       </Transitions>);
}
