import { Navigation } from '../index.js';
import { baseURL, useFetch } from '../assets/js/communication.js'

import '../pages_css/about.css'
import '../assets/css/components.css'
import '../assets/js/communication.js'
import { Loading } from './loading.js';
import Transitions from '../assets/js/transition.js';

export function About(props) {

	[window.educationInfoLoading, window.educationInfoError, window.educationInfoData] = useFetch("api/education-info");
	[window.educationLoading, window.educationError, window.educationData] = useFetch("api/educations?populate=*&sort=Date%3Adesc");
	[window.aboutLoading, window.aboutError, window.aboutData] = useFetch("api/abouts?populate=*&sort=Order%3Aasc");
	[window.languageLoading, window.languageError, window.languageData] = useFetch("api/languages?populate=*&sort=Level%3Adesc");

	if (window.educationError || window.aboutError || window.educationInfoError || window.languageError) {
		return <p>Error.</p>;
	}

	if (window.educationLoading || window.aboutLoading || window.educationInfoLoading || window.languageLoading) {
		return <Loading></Loading>;
	}

	let about = window.aboutData.data;
	let educationInfo = window.educationInfoData.data;
	let education = window.educationData.data;
	let language = window.languageData.data;

	let component = (
		<Transitions className="transition">
			<Navigation highlight='about' />
			<CardAbout data={about} />
			<CardEducation data={education} info={educationInfo} />
			<CardLanguage data={language} />
		</Transitions>
	);
	return component;

}

function CardLanguage(props) {
	let data = props.data;

	let component = (
		<div className='card'>
			<div className='card_element card_element_about'>
				<div className="title title_about">
					<strong>Languages Spoken</strong>
				</div>
				<div className='card_element_row'>
					{
						data.map((d) => {
							return (<div key={d.id} className='card_element_component'>
								<div className='image_holder_square'>
									<img src={baseURL + d.attributes.Image.data.attributes.url} />
								</div>
								<div className='info_holder'>
									<strong>{d.attributes.Name + " - " + d.attributes.Level}</strong>
								</div>
							</div>);
						})
					}
				</div>
			</div>

		</div>);

	return component;
}

function CardAbout(props) {
	let data = props.data;

	let component = (
		<div className="card_container_about card_container">
			{
				data.map((d) => (
					<div key={d.id} className='card card_about'>
						<div className="card_element card_element_about description">
							<div className="title title_about" dangerouslySetInnerHTML={{ __html: d.attributes.Title }} />
							<div dangerouslySetInnerHTML={{ __html: d.attributes.Description }} />
						</div>
						{

							d.attributes.Images.data != null &&
							<div className="card_element card_element_about images">
								{
									d.attributes.Images.data.map((image) => (
										<img key={d.id} src={baseURL + image.attributes.url}></img>
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

function CardEducation(props) {
	let data = props.data;
	let info = props.info;

	let component = (
		<div className="card card_about">
			<div className='card_element card_element_about full_width'>
				{
					<div className="title title_about"> {info.attributes.Title} : &lt;<strong className='colored'>{info.attributes.Domain}</strong>&gt; {info.attributes.StudyLevel}</div>
				}
				{
					data.map((d) => (
						<div key={d.id} className='card_row'>
							<div className="university" dangerouslySetInnerHTML={{ __html: d.attributes.University }} />
							<div className="Years">{d.attributes.Years}</div>
						</div>
					))
				}
			</div>
			<div className='images_holder'>
				{
					data.map((d) => {
						if (d.attributes.Images.data !== null) {
							return <div key={d.id} className='card_element card_element_about images'>
								{
									<img src={baseURL + d.attributes.Images.data[0].attributes.url}></img>
								}
							</div>
						}
					}
					)
				}
			</div>

		</div>
	);
	return component;
}
