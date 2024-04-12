import React, { useReducer } from 'react';
import FormField from '../../stories/components/FormField';
import ThemeButton from '../../stories/components/ThemeButton';
import supabase from '../../Services/Supabase';
import { useNavigate } from 'react-router-dom';

export default function CreateEventForm() {
	const navigate = useNavigate();
	const initialState = {
		groupName: '',
		sendReminder: false,
		eventDate: null,
	};
	const reducer = (state, action) => {
		console.log({ ...state, ...action });
		return { ...state, ...action };
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	const createNewEvent = async (e) => {
		e.preventDefault();
		try {
			const { data, error } = await supabase
				.from('Events')
				.insert([{ name: state.groupName, date: state.eventDate, sendReminder: state.sendReminder }])
				.select();
			if (error) {
				console.error('Error encountered while creating event : ', error);
			} else {
				navigate('/dashboard');
			}
		} catch (error) {
			console.log('Error exception : Creating event - ', error);
		}
	};
	return (
		<div className='lg:max-w-[700px] w-full sm:max-w-lg flex flex-col gap-6'>
			<form onSubmit={createNewEvent} className='flex flex-col gap-3'>
				<FormField
					type='text'
					label='Group name'
					name='groupName'
					value={state.groupName}
					onChange={(e) => dispatch({ groupName: e.target.value })}
				/>
				<FormField
					type='date'
					label='Event Date'
					name='eventDate'
					value={state.eventDate}
					onChange={(e) => dispatch({ eventDate: e.target.value })}
				/>
				<FormField
					type='checkbox'
					label='Send out a reminder before event'
					name='sendReminder'
					value={state.sendReminder}
					onChange={(e) => dispatch({ sendReminder: !state.sendReminder })}
				/>

				{state.error && <span className='font-medium text-red-500 dark:text-white'>{state.error}</span>}
				<ThemeButton form={true}>Submit</ThemeButton>
			</form>
		</div>
	);
}
