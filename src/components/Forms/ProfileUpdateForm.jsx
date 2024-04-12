import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import FormField from '../../stories/components/FormField';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import InvitationCard from '../../stories/components/InvitationCard';
import supabase from '../../Services/Supabase';
import { UploadAvatar, varifyPassword } from '../../Utils/Supabase';

// I think its almost done. you need to just add upload profile picture functionality on registration, get the url and update the profile.
// need to think about the home page for logedin user as well, try showing all current events the user is part of, here the sidebar shall not appear. If user is not yet part of any event, only the create event link should appear telling the user that he has no active evnets. All need to add code to send event reminders

export default function ProfileUpdateForm() {
	const [preview, setPreview] = useState(null);
	const user = useSelector((data) => data?.user?.userData);
	const handleChange_File = async (e) => {
		const file = e.target.files;
		setPreview(file[0]);
	};
	const initialState = {
		name: user?.name,
		email: user?.email,
		password: '',
		error: '',
	};
	function reducer(state, action) {
		return { ...state, ...action };
	}

	async function handleAccountUpdate(e) {
		e.preventDefault();
		dispatch({ error: '' });
		try {
			const isPasswordCorrect = await varifyPassword(state.password);
			if (!isPasswordCorrect) {
				dispatch({ error: 'Incorrect password!' });
				return;
			}
			const { data, error } = await supabase.auth.updateUser({
				email: state.email,
				data: {
					display_name: state.name,
				},
			});
			if (!error && data) {
				if (preview) {
					await UploadAvatar('avatar', preview, user?.id);
				}
			} else {
				console.log(error);
			}
		} catch (error) {
			console.error('Error updating profile', error);
		}
	}
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<form onSubmit={handleAccountUpdate} className='flex flex-col gap-2 md:gap-4'>
			<FormField type='text' label='Name' name='name' value={state.name} onChange={(e) => dispatch({ name: e.target.value })} />
			<FormField type='email' label='Email' name='email' value={state.email} onChange={(e) => dispatch({ email: e.target.value })} />
			<div className='flex flex-col gap-1'>
				<FormField
					type='password'
					label='Password'
					name='password'
					value={state.password}
					onChange={(e) => dispatch({ password: e.target.value })}
				/>
				{state.error && <span className='font-semibold dark:text-red-500'>{state.error}</span>}
			</div>

			<FormField label='Avatar' fileType={'Image'} name='avatar' type='file' accept={'image/png, image/jpg'} onChange={handleChange_File} />
			{preview && <InvitationCard type={'profile'} avatar={URL.createObjectURL(preview)} email={state.email} name={state.name} />}
			<motion.button
				whileTap={{ scale: 0.9 }}
				type='submit'
				className='pt-3 pb-2 text-2xl md:text-3xl rounded-full bg-supernova font-handwriting uppercase '>
				Update
			</motion.button>
		</form>
	);
}
ProfileUpdateForm.propTypes = {
	name: PropTypes.string,
	email: PropTypes.string,
};
