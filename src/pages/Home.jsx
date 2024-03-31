import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InteriorLayout from '../components/layouts/Interior/InteriorLayout';
import SnowFlakeLoader from '../stories/components/Loaders/SnowFlakeLoader';
import { NoPastEventsFallback } from './Event/MyEvents.page';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEvents } from '../redux/Slices/Event.slice';
import { motion } from 'framer-motion';
import EventCard from '../stories/components/EventCard';
import ThemeButton from '../stories/components/ThemeButton';

export default function Home() {
	const dispatch = useDispatch();
	const userEvents = useSelector((data) => data?.events?.userEvents);
	const userEventsLoading = useSelector((data) => data?.events?.loading);
	const userId = useSelector((data) => data?.user?.userData?.id);

	useEffect(() => {
		dispatch(getUserEvents(userId));
	}, [userId]);

	const eventAnime = {
		initial: {
			opacity: 0,
		},
		animate: (i) => ({
			opacity: 1,
			transition: {
				duration: i * 0.25,
			},
		}),
	};
	return (
		<InteriorLayout>
			<div className='flex flex-col pt-8'>
				<ThemeButton link to={'/events/new-event'} size={'lg'} className={'px-8 border-dashed border-yellow-600 border-2'}>
					Create Event
				</ThemeButton>
				{userEventsLoading ? (
					<SnowFlakeLoader />
				) : (
					<ul className='flex flex-col h-full mt-6 lg:mt-8 divide divide-y-2 divide-white dark:divide-white/50'>
						{userEvents && userEvents.length == 0 ? (
							<NoPastEventsFallback />
						) : (
							userEvents?.map((event, i) => {
								return (
									<motion.li key={event?.id} custom={i + 1} variants={eventAnime} initial='initial' animate='animate'>
										<EventCard data={event} />
									</motion.li>
								);
							})
						)}
					</ul>
				)}
			</div>
		</InteriorLayout>
	);
}
