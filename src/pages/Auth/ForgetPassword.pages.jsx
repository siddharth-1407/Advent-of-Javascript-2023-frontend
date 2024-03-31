import React, { useEffect } from 'react';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import AuthTitle from '../../components/layouts/Auth/AuthTitle';
import { ResetPasswordForm } from '../../components/Forms';
import { useNavigate } from 'react-router-dom';
import supabase from '../../Services/Supabase';

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
			<main className='w-full flex flex-col items-center gap-16'>
				<AuthTitle title={'Forget Password'} />
				<ResetPasswordForm />
			</main>
		</AuthLayout>
	);
}
