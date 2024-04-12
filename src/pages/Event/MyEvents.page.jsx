import React, { useEffect } from 'react';
import InteriorLayout from '../../components/layouts/Interior/InteriorLayout';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getUserEvents } from '../../redux/Slices/Event.slice';
import EventCard from '../../stories/components/EventCard';
import GreyBoxesSvg from '../../components/SVGS/GreyBoxesSVG';
import SnowFlakeLoader from '../../stories/components/Loaders/SnowFlakeLoader';
import { Helmet } from 'react-helmet';

export default function MyEvents() {
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
			<Helmet>
				<title>{`My Events | Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, my events, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`My events - Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`My events - Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
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
		</InteriorLayout>
	);
}

export function NoPastEventsFallback() {
	return (
		<div className='w-full h-full grid place-items-center pb-24'>
			<div className='flex flex-col justify-center items-center'>
				<div className='w-64 sm:w-96 aspect-square'>
					<GreyBoxesSvg />
				</div>
				<span className='text-center text-white/80 text-2xl sm:text-4xl  -translate-y-14 sm:-translate-y-16 font-bold'>
					You have no events!
				</span>
			</div>
		</div>
	);
}
