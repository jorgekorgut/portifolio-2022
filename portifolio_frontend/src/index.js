import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './pages_css/lines.css';
import './assets/css/grid.css';
import './assets/css/rules.css';
import './pages_css/background.css';
import './assets/css/components_size.css';
import './assets/css/image_holder.css';
import './assets/css/animation.css';

import { GrSend, GrSearch, GrDocumentPdf } from 'react-icons/gr';
import { BsFilePdfFill } from 'react-icons/bs';

import {
	BrowserRouter as Router,
	Route,
	Routes,
	Link,
	BrowserRouter,
	useNavigate,
	Navigate
} from "react-router-dom";

import {
	About
} from "./pages_js/about.js";

import {
	Experience
} from "./pages_js/experience.js";

import {
	Projects
} from "./pages_js/projects.js";

import {
	Contact
} from "./pages_js/contact.js";
import { Loading } from './pages_js/loading';
import Transitions from './assets/js/transition';
import { baseURL, useFetch } from './assets/js/communication';
import { filterFirstPage } from './assets/js/filter';

function Portifolio(props) {

	[window.cvLoading, window.cvError, window.cvData] = useFetch("api/cvs?populate=*&sort=Date%3Adesc", window.cvData);
	[window.projectLoading, window.projectError, window.projectData] = useFetch("api/projects?populate=*&sort=Order%3Aasc", window.projectData);
	[window.contactLoading, window.contactError, window.contactData] = useFetch("api/contacts?populate=*", window.contactData);
					
	if (window.cvError || window.projectError || window.contactError) {
		return <p>Error.</p>;
	}

	if (window.cvLoading || window.projectLoading || window.contactLoading) {
		return <Loading></Loading>;
	}

	let cv = window.cvData.data[0];
	let project = window.projectData.data;
	let contact = window.contactData.data;

	let contactFirstPage = filterFirstPage(contact);

	return (
		<Transitions className="transition">
			<Navigation />
			<IndexWindows cv={cv} project={project} contact={contactFirstPage} />
		</Transitions>
	);
}

function Button(props) {
	let classes = "button_nav " + props.name;

	if (props.highlight != undefined) {
		if (props.highlight === props.name) {
			classes += " highlight_" + props.name;
			return (
				<Link to={"/"} id={"button_" + props.name} className={classes}>
					<img src={require('./assets/images/' + props.name + '_icon.png')} />
					<div>{props.text}</div>
				</Link>
			);
		}
	}

	return (
		<Link to={"/" + props.name} id={"button_" + props.name} className={classes}>
			<img src={require('./assets/images/' + props.name + '_icon.png')} />
			<div>{props.text}</div>
		</Link>
	);
}

export function Navigation(props) {
	return (
		<div className="container_header">
			<nav id="nav_buttons" className="nav_buttons">
				<Button name="about" text="About me" highlight={props.highlight} />
				<Button name="experience" text="Experience" highlight={props.highlight} />
				<Button name="projects" text="Projects" highlight={props.highlight} />
				<Button name="contact" text="Contact" highlight={props.highlight} />
			</nav>
		</div>
	);
}

function CV(props) {

	let url = props.url;
	let date = props.date;
	return (
		<a id="window_cv" className="window window_about" href={baseURL + url} target="_blank">
			<BsFilePdfFill />
			<div id="information_cv">
				Curriculum Vitae <br />
				<div id="date_upload_cv">
					{date}
				</div>
			</div>
		</a>
	);
}


function Experience_Window(props) {

	let prefix = "<div class=\"prefix\">korgut:~$ </div>";
	const [terminalLines, setTerminalLines] = useState([]);
	const inputTerminal = useRef(null);

	function onTerminalKeyDown(event) {
		let maxLength = 20;

		/* Backspace - Delete - Arrow Keys - Ctrl - Shift*/
		const isValidKeyCode = [8, 16, 17, 37, 38, 39, 40, 46].includes(event.keyCode);

		/* Enter */
		const isInvalidKey = [13].includes(event.keyCode);

		if ((event.target.textContent.length >= maxLength && !isValidKeyCode) || isInvalidKey) {
			event.preventDefault();
		}
	}

	function onTerminalWrite(value) {
		if (value.nativeEvent.key == "Enter") {
			let innerText = value.target.innerText;
			setTerminalLines(terminalLines => [...terminalLines, prefix + innerText])
			value.target.innerText = "";

			switch (innerText) {
				case "ls":
				case "l":
					setTerminalLines(terminalLines => [...terminalLines, "Comming soon."]);
					break;
				case "help":
				case "h":
					setTerminalLines(terminalLines => [...terminalLines, "Comming soon."]);
					break;
				case "clear":
					setTerminalLines(terminalLines => []);
					break;
				case "":
					setTerminalLines(terminalLines => [...terminalLines, ""]);
					break;
				default:
					setTerminalLines(terminalLines => [...terminalLines, terminalLines[terminalLines.length - 1].slice(prefix.length, terminalLines[terminalLines.length - 1].length) + ": command not found"]);
					setTerminalLines(terminalLines => [...terminalLines, "	Please type `help` for more informations."]);
					break;
			}
		}
	}

	function onTerminalClick() {
		inputTerminal.current.focus();
	}

	return (
		<div id="window_experience" className="window window_experience">
			<div className='screen_header'>Explore my terminal</div>
			<div className='screen' onClick={onTerminalClick}>
				{
					terminalLines.map((line, index) => {
						return (<div className='terminal_line' key={index} dangerouslySetInnerHTML={{ __html: line }} />);
					})
				}
				<div className='terminal_line'>
					<div dangerouslySetInnerHTML={{ __html: prefix + "" }} />
					<div className='screen_editable' contentEditable="true" onKeyUp={onTerminalWrite} onKeyDown={onTerminalKeyDown} ref={inputTerminal}>
					</div>
				</div>
			</div>

		</div>
	);
}

function Projects_Window(props) {

	let project = props.project;

	const [projectsFiltered, setProjectsFilter] = useState(project);

	function onResearchBarWrite(event) {
		setProjectsFilter((projects) => {
			return project.filter((value) => {
				return (value.attributes.Tags.toLowerCase().includes(event.target.value.toLowerCase()) ||
					(value.attributes.VisibleTags.toLowerCase().includes(event.target.value.toLowerCase())) ||
					(value.attributes.Name.toLowerCase().includes(event.target.value.toLowerCase()))
				);
			});
		});
	}

	return (
		<div id="window_projects" className="window window_projects">
			<div id="research_bar" className="row">
				<input type="text" placeholder="Research" onChange={onResearchBarWrite}></input>
				<GrSearch />
			</div>
			<div id="container_list">
				<ul id="list_projects">
					{
						projectsFiltered.map((data) => {
							return (<a href={data.attributes.Url} target="_blank" key={data.id} >
								<li className={(data.attributes.Url !== null)?"hover":""}>
								
									{
										"[" + data.attributes.VisibleTags.replaceAll(',', "][") + "]"
									}
									<strong>
										{
											data.attributes.Name
										}
									</strong>
								
							</li>
							</a>);
						})
					}
				</ul>
			</div>
		</div >
	);
}

function Contact_Window(props) {
	let contact = props.contact;
	return (
		<div id="window_contact" className="window window_contact_me">
			<div className="row">
				<input type="text" placeholder="Send me Hi!" maxLength="3"></input>
				<GrSend />
			</div>
			<div className="information_contact">
				{
					contact.map((d) => {
						return <a key={d.id} className='image_holder_index_contact' href={((d.attributes.isEmail)?"mailto:":"https://www.") + d.attributes.Url} target="_blank">
							<img src={baseURL + d.attributes.Image.data.attributes.url} />
						</a>
					})

				}
			</div>
		</div>
	);
}

function IndexWindows(props) {

	let cv = props.cv;
	let project = props.project;
	let contact = props.contact;

	return (
		<div className="container">
			<div className="line experience_line_1"></div>
			<div className="line experience_line_2"></div>
			<div className="line contact_line_1 contact_back_color"></div>
			<div className="line contact_line_2 contact_back_color"></div>
			<div className="line contact_line_3 contact_back_color"></div>
			<div className="line contact_line_4 contact_back_color"></div>
			<div className="line window_contact_me"></div>
			<div className="line projects_line_1 "></div>
			<div className="line projects_line_2"></div>
			<div className="line projects_line_3"></div>
			<div className="line projects_line_4"></div>
			<div className="line experience_line_3"></div>
			<div className="line experience_line_4"></div>
			<div className="line about_line_1"></div>
			<Contact_Window contact={props.contact} />
			<Projects_Window project={project} />
			<Experience_Window />
			<CV url={cv.attributes.File.data.attributes.url} date={cv.attributes.Date} />
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Portifolio />} />
			<Route path="about" element={<About />} />
			<Route path="experience" element={<Experience />} />
			<Route path="projects" element={<Projects />} />
			<Route path="contact" element={<Contact />} />
		</Routes>
	</BrowserRouter>
);
