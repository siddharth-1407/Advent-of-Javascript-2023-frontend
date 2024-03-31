import React, { useReducer } from 'react';
import FormField from '../../stories/components/FormField';
import ThemeButton from '../../stories/components/ThemeButton';
import { Link } from 'react-router-dom';
import supabase from '../../Services/Supabase';

export default function LoginForm() {
	const initialState = {
		email: '',
		password: '',
		error: '',
	};
	const reducer = (state, action) => {
		return { ...state, ...action };
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { error } = await supabase.auth.signInWithPassword({ email: state.email, password: state.password });
			if (error) {
				dispatch({ error: error.message });
			}
		} catch (error) {
			console.log('Error encountered while signing up user : ', error);
		}
	};

	return (
		<div className='lg:max-w-[700px] w-full sm:max-w-lg flex flex-col gap-6'>
			<form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
				<FormField type='email' label='Email' name='email' value={state.email} onChange={(e) => dispatch({ email: e.target.value })} />
				<FormField
					type='password'
					label='Password'
					name='password'
					value={state.password}
					onChange={(e) => dispatch({ password: e.target.value })}
				/>
				<Link to={'/forget-password'} className='text-black font-medium dark:text-white ml-auto'>
					Forget Password?
				</Link>
				{state.error && <span className='font-medium text-red-500 dark:text-white'>{state.error}</span>}
				<ThemeButton form={true}>Submit</ThemeButton>
			</form>
			<Link to={'/register'} className='text-black dark:text-white text-center text-base md:text-lg underline'>
				Need an Account?
			</Link>
		</div>
	);
}
