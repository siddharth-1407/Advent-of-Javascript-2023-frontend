import React, { useEffect } from 'react';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import AuthTitle from '../../components/layouts/Auth/AuthTitle';
import { ResetPasswordForm } from '../../components/Forms';
import { useNavigate } from 'react-router-dom';
import supabase from '../../Services/Supabase';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
	const navigate = useNavigate();
	useEffect(
		() => async () => {
			// navigate the user to home if session exists and if there was an error while getting session
			const { data, error } = await supabase.auth.getSession();
			if (error) {
				console.error('Error encountered while getting session : ', error);
				navigate('/');
			}
			if (data.session) {
				navigate('/');
			}
		},
		[]
	);
	return (
		<AuthLayout>
			<Helmet>
				<title>{`Forget Password - Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Forget Password - Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Forget Password - Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<main className='w-full flex flex-col items-center gap-16'>
				<AuthTitle title={'Forget Password'} />
				<ResetPasswordForm />
			</main>
		</AuthLayout>
	);
}
