import React from 'react';
import { CreateEventForm } from '../../components/Forms';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import AuthTitle from '../../components/layouts/Auth/AuthTitle';
import { Helmet } from 'react-helmet';

export default function CreateNewEvent() {
	return (
		<AuthLayout>
			<Helmet>
				<title>{`Create Event - Secret Santa`}</title>
				<meta
					name='description'
					content='Explore and create Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, create event, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Create Event - Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore and create Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Create Event - Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore and create Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<div className='w-full flex flex-col items-center gap-16'>
				<AuthTitle title={'Set up your event'} />
				<CreateEventForm />
			</div>
		</AuthLayout>
	);
}
