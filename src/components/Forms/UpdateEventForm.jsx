import React, { useReducer } from 'react';
import FormField from '../../stories/components/FormField';
import { useDispatch, useSelector } from 'react-redux';
import ThemeButton from '../../stories/components/ThemeButton';
import supabase from '../../Services/Supabase';
import { setCurrentEvent } from '../../redux/Slices/Event.slice';

export default function UpdateEventForm({ setOpen, open }) {
	const Dispatch = useDispatch();
	const event = useSelector((data) => data?.events?.currentEvent);
	const initialState = event;
	const reducer = (state, action) => {
		return { ...state, ...action };
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	const UpdateEvent = async (e) => {
		console.log(event, initialState, state);
		e.preventDefault();
		try {
			const { data, error } = await supabase
				.from('Events')
				.update({
					...state,
				})
				.match({ id: event?.id })
				.select('id,name,date,sendReminder,ownerId');
			if (!error) {
				Dispatch(setCurrentEvent(...data));
				setOpen(!open);
			} else {
				console.error('Error encountered while updating event : ', error);
			}
		} catch (error) {
			console.log('Error exception : updating event - ', error);
		}
	};
	return (
		<div>
			<form onSubmit={UpdateEvent} className='flex flex-col gap-4'>
				<FormField type='text' name='eventName' label='Event name' value={state?.name} onChange={(e) => dispatch({ name: e.target.value })} />
				<FormField type='date' name='eventDate' label='Event date' value={state?.date} onChange={(e) => dispatch({ date: e.target.value })} />
				<FormField
					name='sendReminder'
					type='checkbox'
					label='Send out a reminder before event'
					checked={state.sendReminder}
					onChange={() => dispatch({ sendReminder: !state.sendReminder })}
				/>
				<ThemeButton form>Update</ThemeButton>
			</form>
		</div>
	);
}
