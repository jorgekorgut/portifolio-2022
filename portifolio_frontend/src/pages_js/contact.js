import { useState, useEffect } from 'react';

import { Navigation } from '../index.js';

import '../pages_css/contact.css'
import '../assets/css/components.css'
import { baseURL, useFetch } from '../assets/js/communication.js';

export function Contact(props) {

	[window.contactLoading, window.contactError, window.contactData] = useFetch("api/contacts?populate=*");
	[window.contactInfoLoading, window.contactInfoError, window.contactInfoData] = useFetch("api/contact-info");


	if (window.contactError || window.contactInfoError) {
		return <p>Error.</p>;
	}

	if (window.contactLoading || window.contactInfoLoading) {
		return <p>Loading...</p>;
	}

	let contact = window.contactData.data;

	return (<>
		<Navigation highlight='contact' />
		<div className='contact_box'>
			<h1>Contact</h1>
			<button>Send a message!</button>
		</div>
		<div className='card_holder'>
			{
				contact.map((data) => {
					return (
						<div className='card card_contact' key={data.id}>
							<div className='card_element card_element_contact card_element_contact_name'>
								<strong>{data.attributes.Name}</strong>
							</div>
							<div className='card_element card_element_contact card_element_url'>
								{
									data.attributes.isUrl &&
									<a href={"https://www."+data.attributes.Url} target="_blank">{data.attributes.Url}</a>
								}
								{
									data.attributes.isEmail &&
									data.attributes.Url
								}	
							</div>
							<div className='card_element card_element_contact card_element_contact_logo'>
								<div className='image_holder image_holder_contact'>
									<img src={baseURL + data.attributes.Image.data.attributes.url} />
								</div>
							</div>
						</div>
					);
				})
			}
		</div>
	</>)
}
