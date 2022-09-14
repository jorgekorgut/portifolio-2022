import { useState, useEffect, useRef } from 'react';

import { Navigation } from '../index.js';

import '../pages_css/contact.css'
import '../assets/css/components.css'
import '../assets/css/animation_slider.css'
import { baseURL, useFetch } from '../assets/js/communication.js';
import { Loading } from './loading.js';
import Transitions from '../assets/js/transition.js';

import { AjaxClient } from 'ajax-client'

export function Contact(props) {

	const [isFormActive, setIsFormActive] = useState(false);
	const formRef = useRef(null);

	[window.contactLoading, window.contactError, window.contactData] = useFetch("api/contacts?populate=*", window.contactData);
	[window.contactInfoLoading, window.contactInfoError, window.contactInfoData] = useFetch("api/contact-info", window.contactInfoData);


	if (window.contactError || window.contactInfoError) {
		return <p>Error.</p>;
	}

	if (window.contactLoading || window.contactInfoLoading) {
		return <Loading></Loading>;
	}

	let contact = window.contactData.data;

	function onSendMessageWriteClicked() {

		setIsFormActive(true);
	};

	function onSendMessageSendClicked() {

		let contactForm = document.getElementById("contact_form");
		let name = contactForm[0].value;
		let email = contactForm[1].value;
		let subject = contactForm[2].value;
		let text = contactForm[3].value;

		let emailPattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!email.match(emailPattern)) {
			alert("Your email adress is not valid.");
			return;
		}

		var url = baseURL + "/api/email-contact";
		const client = new AjaxClient(); // the script where you handle the form input.
		client.ajax({
			type: 'post',
			url: url,
			contentType: 'application/json',
			dataType: 'text',
			data: JSON.stringify({
				'name': name,
				'email': email,
				'subject': subject,
				'text': text,
			})
		}, // serializes the form's elements.
		);

		setIsFormActive(false);
		return;
	};

	return (<Transitions className="transition">
		<Navigation highlight='contact' />
		<div className='contact_box'>
			<h1>Contact</h1>
			{
				isFormActive &&
				<form id='contact_form' ref={formRef}>
					<label>
						Name
						<input id="name" name='name' type="text"></input>
					</label>
					<label>
						Email
						<input id="email" name="email" type="text"></input>
					</label>
					<label>
						Subject
						<input id='subject' name='subject' type="text"></input>
					</label>
					<label>
						Message
						<textarea id='message' name='message' type="text"></textarea>
					</label>
				</form>
			}
			<button onClick={!isFormActive ? onSendMessageWriteClicked : onSendMessageSendClicked}>{!isFormActive ? "Write me a message !" : "Send !"}</button>
		</div>
		<div className='card_holder'>
			{
				contact.map((data) => {
					return (
						<a className='card card_contact' key={data.id} href={((data.attributes.isUrl) ? "https://www." : "mailto:") + data.attributes.Url} target="_blank">

							<div className='card_element card_element_contact card_element_contact_name' >
								<strong>{data.attributes.Name}</strong>
							</div>
							<div className='card_element card_element_contact card_element_url'>
								<div>{data.attributes.Url}</div>
							</div>
							<div className='card_element card_element_contact card_element_contact_logo'>

								<div className='image_holder image_holder_contact'>
									<img src={baseURL + data.attributes.Image.data.attributes.url} />
								</div>
							</div>
						</a>
					);
				})
			}
		</div>
	</Transitions>)
}
