import React, { useEffect } from 'react';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import AuthTitle from '../../components/layouts/Auth/AuthTitle';
import { UpdateNewPasswordForm } from '../../components/Forms';
import supabase from '../../Services/Supabase';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
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
			<div className='w-full flex flex-col items-center gap-16'>
				<AuthTitle title={'Reset Password'} />
				<UpdateNewPasswordForm />
			</div>
		</AuthLayout>
	);
}
