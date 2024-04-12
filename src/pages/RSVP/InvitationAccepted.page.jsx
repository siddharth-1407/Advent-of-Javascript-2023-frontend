import React from 'react';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import { RegisterationForm_Invite } from '../../components/Forms';
import AuthTitle from '../../components/layouts/Auth/AuthTitle';
import { Helmet } from 'react-helmet';

export default function InvitationAccepted_page() {
	return (
		<AuthLayout>
			<Helmet>
				<title>{`Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<main className='w-full flex flex-col justify-center items-center gap-10 py-4'>
				<div className='flex flex-col items-center gap-1'>
					<p className='font-handwriting 2xl:text-2xl text-white '>Awesome!</p>
					<AuthTitle title={'sign up'} />
				</div>
				<RegisterationForm_Invite />
			</main>
		</AuthLayout>
	);
}
