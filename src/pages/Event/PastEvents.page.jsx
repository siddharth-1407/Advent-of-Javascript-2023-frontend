import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEventsJoinedByUser } from '../../redux/Slices/Event.slice';
import InteriorLayout from '../../components/layouts/Interior/InteriorLayout';
import EventCard from '../../stories/components/EventCard';
import GreyBoxesSvg from '../../components/SVGS/GreyBoxesSVG';
import SnowFlakeLoader from '../../stories/components/Loaders/SnowFlakeLoader';
import { Helmet } from 'react-helmet';

export default function PastEvents() {
	const dispatch = useDispatch();
	const eventsJoinedByUser = useSelector((data) => data?.events?.eventsJoinedByUser);
	const loading = useSelector((data) => data?.events?.loading);
	const currentUser = useSelector((data) => data?.user?.userData);

	useEffect(() => {
		dispatch(getEventsJoinedByUser(currentUser?.email));
	}, [currentUser]);

	return (
		<InteriorLayout>
			<Helmet>
				<title>{`Past events - Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming and past Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, past events, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Past events - Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming and past Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Past events - Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming and past Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<p className='text-white uppercase text-6xl sm:text-7xl 2xl:text-9xl 2xl:tracking-wide font-condensed line-clamp-1'>Past Events</p>
			{loading ? (
				<SnowFlakeLoader />
			) : (
				<ul className='flex flex-col h-full mt-6 lg:mt-8 divide divide-y-2 divide-white dark:divide-white/50'>
					{eventsJoinedByUser && eventsJoinedByUser?.length === 0 ? (
						<NoPastEventsFallback />
					) : (
						eventsJoinedByUser?.map((event) => {
							return (
								<li key={event?.id}>
									<EventCard data={event} />
								</li>
							);
						})
					)}
				</ul>
			)}
		</InteriorLayout>
	);
}

function NoPastEventsFallback() {
	return (
		<div className='w-full h-full grid place-items-center pb-24'>
			<div className='flex flex-col justify-center items-center'>
				<div className='w-64 sm:w-96 aspect-square'>
					<GreyBoxesSvg />
				</div>
				<span className='text-center text-white/80 text-2xl sm:text-4xl  -translate-y-14 sm:-translate-y-16 font-bold'>
					You have no past events
				</span>
			</div>
		</div>
	);
}
