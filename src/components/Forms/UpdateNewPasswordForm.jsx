import React, { useReducer } from 'react';
import FormField from '../../stories/components/FormField';
import { Link } from 'react-router-dom';
import supabase from '../../Services/Supabase';

export default function UpdateNewPasswordForm() {
	const reducer = (state, action) => {
		console.log(action);
		return { ...state, ...action };
	};
	const initialState = {
		newPassword: '',
		confirmPassword: '',
		error: '',
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch({ error: '' });
		if (state.newPassword !== state.confirmPassword) {
			return dispatch({ error: "Passwords don't match." });
		} else {
			const { error } = await supabase.auth.updateUser({ password: state.newPassword });
			if (error) {
				console.error('Error encountered while updating password : ', error);
				dispatch({ error: error.message });
			}
		}
		try {
		} catch (error) {
			console.log('Error exception : update password - ', error);
		}
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<div className='lg:max-w-[700px] w-full sm:max-w-lg flex flex-col gap-6'>
			<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
				<FormField
					type='password'
					label='New Password'
					name='newPassword'
					value={state.newPassword}
					onChange={(e) => dispatch({ newPassword: e.target.value })}
				/>
				<FormField
					type='password'
					label='Confirm Password'
					name='confirmPassword'
					value={state.confirmPassword}
					onChange={(e) => dispatch({ confirmPassword: e.target.value })}
				/>
				{state.error && <span>{state.error}</span>}
				<button type='submit' className='pt-3 pb-2 text-2xl md:text-3xl rounded-full bg-supernova font-handwriting uppercase '>
					submit
				</button>
			</form>
			<Link to={'/register'} className='text-black dark:text-white text-center text-base md:text-lg underline'>
				Need an Account?
			</Link>
		</div>
	);
}
