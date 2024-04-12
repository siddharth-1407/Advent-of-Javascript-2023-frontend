import React, { useEffect, useState } from 'react';
import { RegisterationForm_Invite, RegistrationForm } from '../../components/Forms';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import AuthTitle from '../../components/layouts/Auth/AuthTitle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import supabase from '../../Services/Supabase';
import { InvitationStatus } from '../../Utils';
import { Helmet } from 'react-helmet';

export default function Register() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [user, setUser] = useState(null);
	const id = searchParams.get('id');
	const eventId = searchParams.get('eventId');
	useEffect(() => {
		async function getInvitedUser() {
			const { data, error } = await supabase.from('Invites').select('email,status,Events(date)').match({
				id,
				eventId,
			});
			if (!error) {
				setUser(...data);
			} else {
				navigate('/broken-link');
			}
		}
		if (id && eventId) {
			getInvitedUser();
		}
	}, []);
	useEffect(() => {
		if (user && user?.status !== InvitationStatus.accepted) {
			navigate(location.pathname.replace('register', 'invitation') + `?id=${id}&eventId=${eventId}&event-date=${user.Events.date}`);
		}
	}, [user]);
	return (
		<AuthLayout>
			<Helmet>
				<title>{`Register - Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, register , events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Register - Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Register - Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<div className='w-full flex flex-col items-center gap-8 sm:gap-16 xl:gap-8'>
				<AuthTitle title={'Sign up'} />
				<Render_RegistrationForm id={id} eventId={eventId} email={user?.email} />
			</div>
		</AuthLayout>
	);
}

function Render_RegistrationForm({ id, eventId, email }) {
	return <>{id && eventId ? <RegisterationForm_Invite email={email} /> : <RegistrationForm />}</>;
}
