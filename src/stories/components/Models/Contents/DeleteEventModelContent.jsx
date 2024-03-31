import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ModelType, handleModel } from '../../../../redux/Slices/Model.slice';
import supabase from '../../../../Services/Supabase';
import { removeCurrentEvent } from '../../../../redux/Slices/Event.slice';

export default function DeleteEventModelContent() {
	const ModelRef = useRef(null);
	const dispatch = useDispatch();
	const [eventDate, setEventDate] = useState('');
	const event = useSelector((data) => data.events.currentEvent);

	const handleDeleteEvent = async () => {
		try {
			const { error } = await supabase.from('Events').delete().match({ id: event?.id });
			if (!error) {
				dispatch(removeCurrentEvent());
				dispatch(handleModel({ type: ModelType.deleteEvent, value: false }));
			} else {
				console.error('Error encountered while deleting Event : ', error);
			}
		} catch (error) {
			console.log('Error exception : deleting Event - ', error);
		}
	};
	useEffect(() => {
		function handleClick(e) {
			if (!ModelRef.current?.contains(e.target)) {
				dispatch(handleModel({ type: ModelType.deleteEvent, value: false }));
			}
		}
		window.addEventListener('mousedown', handleClick);
		return () => window.removeEventListener('mousedown', handleClick);
	}, []);
	useState(() => {
		setEventDate(
			new Date(event?.date).toLocaleDateString('en-US', {
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			})
		);
	}, [event]);

	return (
		<section
			ref={ModelRef}
			role='dialog'
			className='p-6 sm:pb-10 border-2 relative -left-0.5 sm:static sm:border-6 rounded border-white text-white bg-orangeRed flex flex-col items-center justify-center w-full  sm:max-w-lg md:max-w-2xl lg:max-w-2xl 2xl:max-w-3xl'>
			<div className='w-full flex flex-col gap-8'>
				<div className='flex-1 pt-4'>
					<p className='text-center font-bold text-2xl sm:text-3xl'>Are you sure you want to delete {event?.name}?</p>
				</div>
				<div className='flex flex-col gap-2 justify-center items-center'>
					<span className='text-xl font-handwriting font-bold '>{eventDate}</span>
					<strong className='line-clamp-2 text-6xl lg:text-7xl font-condensed font-bold text-center'>{event?.name}</strong>
				</div>
				<div className='font-bold flex justify-center gap-4'>
					<motion.button
						onClick={() => dispatch(handleModel({ type: ModelType.deleteEvent, value: false }))}
						whileTap={{ scale: 0.9 }}
						whileHover={{
							borderColor: 'white',
						}}
						className='text-white uppercase underline rounded-full px-6 py-2 border-2 border-transparent transition-colors'>
						Cancel
					</motion.button>
					<motion.button
						onClick={handleDeleteEvent}
						whileTap={{ scale: 0.9 }}
						className='text-white uppercase bg-black rounded-full px-6 py-2 border-2 border-transparent'>
						Delete
					</motion.button>
				</div>
			</div>
		</section>
	);
}
