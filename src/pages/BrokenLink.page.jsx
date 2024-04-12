import React from 'react';
import AuthLayout from '../components/layouts/Auth/AuthLayout';
import AuthTitle from '../components/layouts/Auth/AuthTitle';
import ThemeButton from '../stories/components/ThemeButton';
import { Helmet } from 'react-helmet';

export default function BrokenLink() {
	return (
		<AuthLayout>
			<Helmet>
				<title>{`Link is broken - Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Link is broken - Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Link is broken - Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<img src='/loader/loader_snowman.svg' alt='' />
			<AuthTitle title={'Link is broken!'} />
			<div className='pt-12'>
				<ThemeButton to='/' link size='sm'>
					Home
				</ThemeButton>
			</div>
		</AuthLayout>
	);
}
