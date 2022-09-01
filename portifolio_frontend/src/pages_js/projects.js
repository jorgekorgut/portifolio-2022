import { useState, useEffect } from 'react';

import { Navigation } from '../index.js';

import '../pages_css/projects.css'
import '../assets/css/components.css'
import { baseURL, useFetch } from '../assets/js/communication.js';
import { Loading } from './loading.js';
import Transitions from '../assets/js/transition.js';

function ResearchBar() {
	return (
		<div className='research_container'>
			<input type="text" className='research' placeholder="HTML, C#, FLUTTER, ...">
			</input>
			<button onClick={onResearch()} className="button_project">
				Search
			</button>
		</div>
	)
}

export function Projects(props) {

	[window.projectLoading, window.projectError, window.projectData] = useFetch("api/projects?populate=*&sort=Order%3Aasc");

	if (window.projectError) {
		return <p>Error.</p>;
	}

	if (window.projectLoading) {
		return <Loading></Loading>;
	}

	let project = window.projectData.data;

	return (<Transitions className="transition">
		<Navigation highlight='projects' />
		<ResearchBar />
		<div className='card_holder'>
			{
				project.map((data) => {
					return (<div className='card card_projects' key={data.id}>
						<div className='card_element card_element_projects card_element_projects_tags'>
							<div dangerouslySetInnerHTML={{ __html: data.attributes.Tags.replaceAll(',', "<br/>") }} />
						</div>
						<div className='card_element card_element_projects card_element_projects_content'>
							<header>
								<h1>
									{data.attributes.Name}
								</h1>
								{
									data.attributes.Url !== null &&
									<a href={data.attributes.Url} target="_blank">
										<div className='image_holder image_holder_projects'>
											<img src={baseURL + data.attributes.Url_Image.data.attributes.url} />
										</div>
									</a>
								}
							</header>
							<div className='description_projects'>
								{data.attributes.Description}
							</div>
						</div>
						<div className='card_element card_element_projects card_element_image'>
							<div className='image_holder image_holder_projects_image'>
								<img src={baseURL+data.attributes.Image.data.attributes.url}/>
							</div>
						</div>
					</div>);
				})
			}


		</div>
	</Transitions>)
}

function onResearch() {

}
