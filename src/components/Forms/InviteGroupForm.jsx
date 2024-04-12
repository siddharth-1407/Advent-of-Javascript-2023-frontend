import React, { useReducer } from 'react';
import RoundButton from '../../stories/components/RoundButton';
import FormField from '../../stories/components/FormField';
import { motion } from 'framer-motion';
import supabase from '../../Services/Supabase';
import { addInvitee, removeInvitee } from '../../redux/Slices/InviteList.slice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export default function InviteGroupForm({ eventId }) {
	const BASEURL = import.meta.env.MODE === 'production' ? import.meta.env.VITE_BACKEND_PROD_BASE_URL : import.meta.env.VITE_BACKEND_DEV_BASE_URL;
	const Dispatch = useDispatch();
	const event = useSelector((data) => data?.events?.currentEvent);
	const user = useSelector((data) => data?.user?.userData);
	const emailRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
	const initialState = {
		name: '',
		email: '',
		error: '',
	};
	const reducer = (state, action) => {
		if (state.email && !emailRegex.exec(state.email)) {
			state.error = 'Please provide a valid email';
		} else {
			state.error = '';
		}
		return { ...state, ...action };
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	const sendInviteToUser = async (id) => {
		try {
			const res = await axios.post(
				`${BASEURL}/send-email/invite`,
				{
					id,
					invitedUser: state.name,
					email: state.email,
					event: { ...event },
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (res.status !== 200) {
				throw new Error(`Failed to send invite. Server returned status ${res.status}.`);
			}
			// const data = await res.json();
			console.log(res.data);
			return res;
		} catch (error) {
			console.error('Error exception while sending invite :', error);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data, error } = await supabase
				.from('Invites')
				.insert({
					name: state.name,
					email: state.email,
					eventId: eventId,
				})
				.select('id,name,email,status');
			if (!error) {
				const res = await sendInviteToUser(data[0]?.id);
				if (res) {
					Dispatch(addInvitee(...data));
				} else {
					removeInvite(data[0]?.id);
					Dispatch(removeInvitee(data[0]?.id));
				}
			} else {
				console.log('Error encountered while adding invite : ', error);
			}
		} catch (error) {
			console.log('Error exception : Invite person to group - ', error);
		}
	};
	const removeInvite = async (id) => {
		try {
			const { error } = await supabase.from('Invites').delete().match({
				id: id,
			});
			if (!error) {
				return console.log('Invite removed');
			}
			return console.log('Error: ', error);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='w-full p-4 rounded-lg flex flex-col items-start md:flex-row gap-4 bg-spanishGreen hover:bg-spanishGreen/90 dark:bg-blackPearl dark:hover:bg-blackPearl/90  transition-colors'>
			<div className='w-full rounded overflow-hidden'>
				<FormField type='text' label='Name' name='name' value={state.name} onChange={(e) => dispatch({ name: e.target.value })} />
			</div>
			<div className='w-full rounded overflow-hidden' aria-live='assertive'>
				<FormField type='email' label='Email' name='email' value={state.email} onChange={(e) => dispatch({ email: e.target.value })} />
				{state.error && <span className='text-white text-sm'>{state.error}</span>}
			</div>
			<div className='hidden md:block self-center'>
				<RoundButton type={'warning'} form />
			</div>
			<motion.button
				type='submit'
				whileTap={{ scale: 0.9 }}
				className='md:hidden  w-full pb-1 pt-2 rounded-full text-lg font-handwriting bg-supernova border-2'>
				Add
			</motion.button>
		</form>
	);
}
