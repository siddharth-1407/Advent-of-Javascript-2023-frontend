import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InteriorLayout from '../../components/layouts/Interior/InteriorLayout';
import { useDispatch, useSelector } from 'react-redux';
import SnowFlakeLoader from '../../stories/components/Loaders/SnowFlakeLoader';
import { getUserEvents } from '../../redux/Slices/Event.slice';
import GreyBoxesSvg from '../../components/SVGS/GreyBoxesSVG';
import EventCard from '../../stories/components/EventCard';
import { useState } from 'react';
import supabase from '../../Services/Supabase';
import InvitationCard from '../../stories/components/InvitationCard';
import { Helmet } from 'react-helmet';

export default function OurEvents() {
	const dispatch = useDispatch();
	const [eventOwner, setEventOwner] = useState(null);
	const allEvents = useSelector((data) => data?.events?.userEvents);
	const loading = useSelector((data) => data?.events?.loading);
	const params = useParams();
	useEffect(() => {
		async function fetchEventOwnerData() {
			try {
				const { data, error } = await supabase.from('Profiles').select('id, name, email, avatar').match({ id: params?.ownerId });
				if (!error) {
					setEventOwner(...data);
				} else {
					console.error(error);
				}
			} catch (error) {
				console.log('Error while getting event owner data : ', error);
				return null;
			}
		}
		dispatch(getUserEvents(params?.ownerId));
		fetchEventOwnerData();
	}, []);

	return (
		<InteriorLayout>
			<Helmet>
				<title>{`Our Events | Secret Santa`}</title>
				<meta
					name='description'
					content='Explore our upcoming and past Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, our events, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Our Events - Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore our upcoming and past Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Our Events - Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore our upcoming and past Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			{loading && <SnowFlakeLoader />}
			{!loading && (
				<div className='flex flex-col gap-8'>
					{eventOwner && (
						<div className='pl-4'>
							<InvitationCard
								name={eventOwner?.name}
								email={eventOwner?.email}
								avatar={eventOwner?.avatar}
								type={eventOwner?.avatar ? 'profile' : 'initial'}
							/>
						</div>
					)}
					<ul className='flex flex-col h-full mt-6 lg:mt-8 divide divide-y-2 divide-white dark:divide-white/50'>
						{allEvents && allEvents?.length === 0 ? (
							<NoPastEventsFallback />
						) : (
							allEvents.map((event) => {
								return (
									<li key={event?.id}>
										<EventCard data={event} />
									</li>
								);
							})
						)}
					</ul>
				</div>
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
					User has no events
				</span>
			</div>
		</div>
	);
}
