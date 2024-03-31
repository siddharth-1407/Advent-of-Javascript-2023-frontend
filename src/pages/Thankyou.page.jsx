import React, { useEffect, useState } from 'react';
import InteriorLayout from '../components/layouts/Interior/InteriorLayout';
import { ThankyouMessageForm } from '../components/Forms';
import InvitationCard from '../stories/components/InvitationCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../redux/Slices/Event.slice';
import supabase from '../Services/Supabase';
import { motion } from 'framer-motion';

export default function Thankyou() {
	const params = useParams();
	const dispatch = useDispatch();
	const [santa, setSanta] = useState(null);
	const event = useSelector((data) => data?.events?.currentEvent);
	const currentUser = useSelector((data) => data?.user?.userData);

	useEffect(() => {
		const eventName = params.event.replaceAll('-', ' ');
		if (event && event.name !== eventName) {
			dispatch(getEvent(eventName));
		}
	}, []);
	useEffect(() => {
		async function getSanta() {
			let santaId;
			try {
				const { data, error } = await supabase.from('Pairings').select('santaId').match({
					eventId: event?.id,
					personId: currentUser?.id,
				});
				if (!error) {
					santaId = data[0]?.santaId;
				} else {
					console.log(error);
					return;
				}
			} catch (error) {
				console.log(error);
				console.error('Error getting santa id from pairing');
				return;
			}
			try {
				const { data, error } = await supabase.from('Profiles').select('id,name,email,avatar').match({
					id: santaId,
				});
				if (!error) {
					setSanta(...data);
				} else {
					console.log(error);
					return;
				}
			} catch (error) {
				console.log(error);
				console.log('Error while getting santa info');
				return;
			}
		}
		if (Object.keys(event).length > 0 && Object.keys(currentUser).length > 0) {
			getSanta();
		}
	}, [event]);
	return (
		<InteriorLayout>
			<div className='lg:pl-24 xl:pl-32 flex flex-col gap-4 lg:gap-8'>
				<strong className='text-6xl sm:text-7xl  2xl:text-9xl 2xl:tracking-wide font-condensed text-white'>Thankyou</strong>
				{santa && (
					<>
						<motion.div
							initial={{ scale: 0 }}
							animate={{
								scale: 1,
								transition: {
									duration: 0.3,
								},
							}}>
							<InvitationCard
								avatar={santa?.avatar}
								name={santa?.name}
								email={santa?.email}
								type={santa.avatar ? 'profile' : 'initial'}
							/>
						</motion.div>
						<ThankyouMessageForm santa={santa} user={currentUser} />
					</>
				)}
			</div>
		</InteriorLayout>
	);
}
