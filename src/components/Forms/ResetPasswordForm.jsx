import React, { useState } from 'react';
import FormField from '../../stories/components/FormField';
import { Link } from 'react-router-dom';
import supabase from '../../Services/Supabase';

export default function ResetPassword_Form() {
	const baseUrl = import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_PRODUCTION_BASE_URL : import.meta.env.VITE_DEV_BASE_URL;
	const [email, setEmail] = useState('');
	const [resend, setResend] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(baseUrl)
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo : `${baseUrl}/reset-password`,
			});
			if (error) {
				console.error('Error : resetPassword - ', error);
			}
		} catch (error) {
			console.log('Error exception : reset password submission - ', error);
		}finally{
		        setResend(true);
		}
	};
	return (
		<div className='lg:max-w-[700px] w-full sm:max-w-lg flex flex-col gap-6'>
			<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
				<FormField type='email' label='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
				<button type='submit' className='pt-3 pb-2 text-2xl md:text-3xl rounded-full bg-supernova font-handwriting uppercase '>
					Submit
				</button>
				{resend && (
					<p className='text-black dark:text-white font-medium text-center'>
						Didn't recive the mail?
						<button type='button' onClick={handleSubmit} className='font-bold px-1 underline'>
							Resend!
						</button>
					</p>
				)}
			</form>
			<Link to={'/register'} className='text-black dark:text-white text-center text-base md:text-lg underline'>
				Need an Account? Sign up!
			</Link>
		</div>
	);
}
