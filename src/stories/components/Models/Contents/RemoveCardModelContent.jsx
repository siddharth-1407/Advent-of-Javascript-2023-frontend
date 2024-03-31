import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import InvitationCard from '../../InvitationCard';
import { useDispatch, useSelector } from 'react-redux';
import { ModelType, handleModel } from '../../../../redux/Slices/Model.slice';
import supabase from '../../../../Services/Supabase';
import { removeInvitee } from '../../../../redux/Slices/InviteList.slice';

export default function RemoveCardModelContent() {
	const ModelRef = useRef(null);
	const event = useSelector((data) => data.events.currentEvent);
	const user = useSelector((data) => data?.invites?.currentSelected);
	const dispatch = useDispatch();
	const handleRemoveInvite = async (personId) => {
		try {
			const { error } = await supabase.from('Invites').delete().match({ id: personId, eventId: event.id });
			if (!error) {
				dispatch(removeInvitee(personId));
				dispatch(handleModel({ type: ModelType.deleteInvite, value: false }));
			} else {
				console.error('Error encountered while deleting invitee : ', error);
			}
		} catch (error) {
			console.log('Error exception : deleting invitee - ', error);
		}
	};
	useEffect(() => {
		function handleClick(e) {
			if (!ModelRef.current?.contains(e.target)) {
				dispatch(handleModel({ type: ModelType.deleteInvite, value: false }));
			}
		}
		window.addEventListener('mousedown', handleClick);
		return () => window.removeEventListener('mousedown', handleClick);
	}, []);

	return (
		<div
			ref={ModelRef}
			role='dialog'
			className='p-6 sm:pb-10 border-2 relative -left-0.5 sm:static sm:border-6 rounded border-white text-white bg-orangeRed flex flex-col items-center justify-center w-full  sm:max-w-lg md:max-w-2xl lg:max-w-3xl 2xl:max-w-3xl'>
			<div className='w-full flex flex-col gap-8'>
				<div className='flex-1 pt-4'>
					<p className='text-center font-bold text-2xl sm:text-3xl'>Are you sure you want to remove {user?.name}?</p>
				</div>
				<div className='flex justify-center items-center'>
					<div className='w-full max-w-xs md:max-w-md relative left-2'>
						<InvitationCard
							name={user.name}
							email={user?.email}
							avatar={user?.avatar || './avatars/placeholder_avatar-06.png'}
							status={user?.status}
						/>
					</div>
				</div>
				<div className='font-bold flex justify-center gap-4'>
					<motion.button
						onClick={() => dispatch(handleModel({ type: ModelType.deleteInvite, value: false }))}
						whileTap={{ scale: 0.9 }}
						whileHover={{
							borderColor: 'white',
						}}
						className='text-white uppercase underline rounded-full px-6 py-2 border-2 border-transparent transition-colors'>
						Cancel
					</motion.button>
					<motion.button
						onClick={() => handleRemoveInvite(user.id)}
						whileTap={{ scale: 0.9 }}
						className='text-white uppercase bg-black rounded-full px-6 py-2 border-2 border-transparent'>
						Remove
					</motion.button>
				</div>
			</div>
		</div>
	);
}
