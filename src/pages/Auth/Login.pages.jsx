import React, { useEffect } from 'react';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import AuthTitle from '../../components/layouts/Auth/AuthTitle';
import { LoginForm } from '../../components/Forms';
import { useNavigate } from 'react-router-dom';
import supabase from '../../Services/Supabase';

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
			<div className='w-full flex flex-col items-center gap-16'>
				<AuthTitle title={'Sign in'} />
				<LoginForm />
			</div>
		</AuthLayout>
	);
}
