import React, { useState } from 'react';
import FormField from '../../stories/components/FormField';
import ThemeButton from '../../stories/components/ThemeButton';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../Services/Supabase';
import { useSelector } from 'react-redux';

export default function ThankyouMessageForm({ santa, user }) {
	const navigate = useNavigate();
	const params = useParams();
	const [message, setMessage] = useState('');
	const event = useSelector((data) => data?.events?.currentEvent);
	const BASEURL = import.meta.env.NODE_ENV == 'production' ? import.meta.env.VITE_BACKEND_PROD_BASE_URL : import.meta.env.VITE_BACKEND_DEV_BASE_URL;
	async function handleSubmit(e) {
		e.preventDefault();
		const data = {
			from: user.name,
			to: santa.name,
			santaEmail: santa.email,
			message,
		};
		try {
			const res = await fetch(`${BASEURL}/send-email/thankyou`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (res.ok) {
				handleThankyou();
				navigate(`/events/${params.event}`);
			}
		} catch (error) {
			console.log(error);
		}
	}
	async function handleThankyou() {
		try {
			const { data, error } = await supabase.from('Thankyou').insert({
				message,
				fromUserId: user.id,
				toUserId: santa.id,
				eventId: event.id,
			});
			if (!error) {
				console.log(data);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<form onSubmit={handleSubmit} className={'flex flex-col gap-3'}>
			<FormField type='textarea' label='Message' name='message' rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
			<ThemeButton form>Send</ThemeButton>
		</form>
	);
}
