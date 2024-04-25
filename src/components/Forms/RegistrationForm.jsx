import React, { useReducer, useState } from 'react';
import FormField from '../../stories/components/FormField';
import ThemeButton from '../../stories/components/ThemeButton';
import { Link } from 'react-router-dom';
import supabase from '../../Services/Supabase';

export default function RegistrationForm() {
	const [message, setMessage] = useState(false);
	const BASE_URL = import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEV_BASE_URL;
	const initialState = {
		name: '',
		email: '',
		password: '',
	};
	const reducer = (state, action) => {
		return { ...state, ...action };
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data, error } = await supabase.auth.signUp({
				email: state.email,
				password: state.password,
				options: {
					data: {
						display_name: state.name,
					},
					emailRedirectTo: `${BASE_URL}/login`,
				},
			});
			if (!error) {
				setMessage(true);
			} else {
				console.error('Error encountered while registering user : ', error);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='lg:max-w-[700px] w-full sm:max-w-lg flex flex-col gap-6 pb-8'>
			<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
				<FormField type='text' label='Name' name='name' value={state.name} onChange={(e) => dispatch({ name: e.target.value })} />
				<FormField type='email' label='Email' name='email' value={state.email} onChange={(e) => dispatch({ email: e.target.value })} />
				<FormField
					type='password'
					label='Password'
					name='password'
					value={state.password}
					onChange={(e) => dispatch({ password: e.target.value })}
				/>
				{message && <span className='text-black dark:text-white font-medium'>Confirm email to activate the account.</span>}
				<ThemeButton form={true}>Submit</ThemeButton>
			</form>
			<Link to={'/login'} className='text-black dark:text-white text-center text-base md:text-lg underline'>
				Ready to Login?
			</Link>
		</div>
	);
}
