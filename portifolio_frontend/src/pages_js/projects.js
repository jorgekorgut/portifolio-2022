import { useState, useEffect, useRef } from 'react';

import { Navigation } from '../index.js';

import '../pages_css/projects.css'
import '../assets/css/components.css'
import { baseURL, useFetch } from '../assets/js/communication.js';
import { Loading } from './loading.js';
import Transitions from '../assets/js/transition.js';


export function Projects(props) {

	const [projectsFiltered, setProjectsFilter] = useState([]);
	const [emptyResult, setEmptyResult] = useState(false);
	let researchRef = useRef(null);

	[window.projectLoading, window.projectError, window.projectData] = useFetch("api/projects?populate=*&sort=Order%3Aasc", window.projectData);

	if (window.projectError) {
		return <p>Error.</p>;
	}

	if (window.projectLoading) {
		return <Loading></Loading>;
	}

	let project = window.projectData.data;
	
	if(projectsFiltered.length === 0 && project !== []){
		setProjectsFilter((projectState => project));
	}

	function onResearchClicked() {
		setProjectsFilter((projectState) => {
			let filterTarget = project.filter((value) => {
				if(researchRef.current.value === ""){
					return project;
				}

				return (value.attributes.Tags.toLowerCase().includes(researchRef.current.value.toLowerCase()) ||
					(value.attributes.VisibleTags.toLowerCase().includes(researchRef.current.value.toLowerCase())) ||
					(value.attributes.Name.toLowerCase().includes(researchRef.current.value.toLowerCase()))
				);
			});

			if(filterTarget.length === 0){
				setEmptyResult((emptyReact)=>true);
			}else{
				setEmptyResult((emptyReact)=>false);
			}

			return filterTarget;
		});
	}



	return (<Transitions className="transition">
		<Navigation highlight='projects' />
		<div className='research_container'>
			<input type="text" className='research' placeholder="HTML, C#, FLUTTER, ..." ref={researchRef} onChange={onResearchClicked}>
			</input>
		</div>
		{
			emptyResult &&
			<div className='empty_result_warning'> <strong>There are no projects that correspond to your search.</strong> <br/> <br/>Listing all projects...</div>
		}
		<div className='card_holder'>
			{
				projectsFiltered.map((data) => {
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
