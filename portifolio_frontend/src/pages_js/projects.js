import { useState , useEffect } from 'react';

import {Navigation} from '../index.js';

import '../pages_css/projects.css'
import '../assets/css/components.css'

function ResearchBar(){
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

export function Projects(props){
	return (<>
			<Navigation highlight='projects'/>
			<ResearchBar/>
	       </>)
}

function onResearch(){

}
