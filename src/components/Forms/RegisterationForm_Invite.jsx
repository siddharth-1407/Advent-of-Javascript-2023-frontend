import React, { useReducer, useState } from 'react';
import FormField from '../../stories/components/FormField';
import supabase from '../../Services/Supabase';
import { useNavigate } from 'react-router-dom';
import ThemeButton from '../../stories/components/ThemeButton';
import InvitationCard from '../../stories/components/InvitationCard';
import { UploadAvatar, getAvatarUrl } from '../../Utils/Supabase';

export default function RegisterationForm_Invite({ email }) {
	const navigate = useNavigate();
	const [preview, setPreview] = useState(null);
	const initialState = {
		name: '',
		password: '',
		error: '',
	};

	const reducer = (state, action) => {
		return { ...state, ...action };
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	const handleChange_File = async (e) => {
		const file = e.target.files;
		setPreview(file[0]);
	};

	async function UpdateUserProfile(avatarUrl, userId) {
		try {
			const { data, error } = await supabase
				.from('Profiles')
				.update({
					avatar: avatarUrl,
				})
				.eq('id', userId);
			if (!error) {
				console.log(data);
				console.log('Profile updated');
			} else {
				console.error(error);
			}
		} catch (error) {
			console.log(error);
		}
	}
	// async function UploadAvatar(fileName, file, userId) {
	// 	try {
	// 		const { data, error } = await supabase.storage.from('Avatars').upload(fileName, file, {
	// 			upsert: true,
	// 		});
	// 		if (!error && data?.path) {
	// 			console.log('Avatar uploaded!');
	// 		} else {
	// 			console.error('Error encountered while uploading avatar : ', error?.message, error);
	// 		}
	// 	} catch (error) {
	// 		console.log('Error : while uploading avatar - ', error);
	// 	}
	// }
	// async function getUserAvatar(userId) {
	// 	try {
	// 		const { data, error } = await supabase.storage.from('Avatars').getPublicUrl();
	// 		if (!error && data) {
	// 			console.log(data, error);
	// 			return data;
	// 		} else {
	// 			console.log('Error while getting public url ', error);
	// 			return null;
	// 		}
	// 	} catch (error) {
	// 		console.log('Error : ', error);
	// 		return null;
	// 	}
	// }
	const registerUser = async (e) => {
		e.preventDefault();
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password: state.password,
				options: {
					data: {
						display_name: state.name,
					},
				},
			});
			if (!error && data) {
				const regex = /[a-zA-Z0-9#$%/]{2,}([a-z]{3,})$/;
				const extention = regex.exec(preview.type)?.[1];
				await UploadAvatar(`${data?.user?.id}/avatar.${extention}`, preview, data?.user?.id);
				const uploadedImageUrl = await getAvatarUrl(data?.user?.id);
				await UpdateUserProfile(uploadedImageUrl, data?.user?.id);
				navigate('/');
			} else {
				state.error = error.message;
			}
		} catch (error) {
			console.log('Error : ', error);
		}
	};
	return (
		<div className='lg:max-w-[700px] w-full sm:max-w-lg flex flex-col gap-6 pb-8'>
			<form onSubmit={registerUser} className='flex flex-col gap-3'>
				<FormField label='Name' name='name' value={state.name} onChange={(e) => dispatch({ name: e.target.value })} />
				<FormField
					label='Password'
					name='password'
					type='password'
					value={state.password}
					onChange={(e) => dispatch({ password: e.target.value })}
				/>
				<FormField label='Avatar' fileType={'Image'} name='avatar' type='file' accept={'image/png, image/jpg'} onChange={handleChange_File} />
				{preview && <InvitationCard type={'profile'} avatar={URL.createObjectURL(preview)} email={email} name={state.name} />}
				<ThemeButton form>Submit</ThemeButton>
			</form>
		</div>
	);
}
