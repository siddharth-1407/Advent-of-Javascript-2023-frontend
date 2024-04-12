import React, { useEffect } from 'react';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import AuthTitle from '../../components/layouts/Auth/AuthTitle';
import { LoginForm } from '../../components/Forms';
import { useNavigate } from 'react-router-dom';
import supabase from '../../Services/Supabase';
import { Helmet } from 'react-helmet';

export default function Login() {
	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth.onAuthStateChange((e) => {
			if ((e !== 'INITIAL_SESSION' && e !== 'SIGNED_OUT') || e === 'SIGNED_IN') {
				navigate('/');
			}
		});
	}, []);

	return (
		<AuthLayout>
			<Helmet>
				<title>{`Login - Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Login - Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Login - Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<div className='w-full flex flex-col items-center gap-16'>
				<AuthTitle title={'Sign in'} />
				<LoginForm />
			</div>
		</AuthLayout>
	);
}
