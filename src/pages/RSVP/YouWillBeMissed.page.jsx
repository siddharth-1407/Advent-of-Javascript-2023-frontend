import React, { useEffect, useState } from 'react';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import { useSearchParams } from 'react-router-dom';
import supabase from '../../Services/Supabase';
import { InvitationStatus } from '../../Utils';
import { Helmet } from 'react-helmet';

export default function YouWillBeMissed_page() {
	const [searchParams] = useSearchParams();
	const [user, setUser] = useState(null);
	const id = searchParams.get('id');
	const eventId = searchParams.get('eventId');

	useEffect(() => {
		if (!id || !eventId) {
			navigate('broken-link');
		}
		async function getInvitedUser() {
			try {
				const { data, error } = await supabase.from('Invites').select('id,status,updated_at,Events(date)').match({
					id,
					eventId,
				});
				if (!error) {
					data.length == 0 ? navigate('/not-found') : setUser(...data);
				} else {
					console.log('Error while getting invited user data : ', error);
					navigate('/not-found');
				}
			} catch (error) {
				console.log('Error - ', error);
				navigate('/server-error');
			}
		}
		getInvitedUser();
	}, []);
	useEffect(() => {
		if (user) {
			if (user?.status === InvitationStatus.invited) {
				const redirect_Link_on_status_invited =
					location.pathname.replace('you-will-be-missed', 'invitation') + `?id=${id}&eventId=${eventId}&event-date=${user?.Events?.date}`;
				navigate(redirect_Link_on_status_invited);
			} else if (user?.status === InvitationStatus.accepted) {
				navigate('/');
			}
		}
	}, [user]);
	return (
		<AuthLayout>
			<Helmet>
				<title>{`You will be missed | Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`You will be missed | Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`You will be missed | Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<main className='w-full flex flex-col justify-center items-center gap-10 2xl:gap-16 py-4'>
				<div className='flex flex-col items-center gap-6 '>
					<h1
						className='text-center text-4xl md:text-6xl sm:text-6xl 2xl:text-7xl text-white font-condensed whitespace-nowrap relative 
                   before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[4rem] sm:before:-left-[5rem] before:h-0.5 before:bg-white
                   after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-[4rem] sm:after:-right-[5rem] after:h-0.5 after:bg-white
                   before:w-14 after:w-14 md:before:w-16 md:after:w-16'>
						Thanks
					</h1>
					<strong className='uppercase font-condensed text-white text-5xl sm:text-7xl 2xl:text-8xl'>You will be missed</strong>
				</div>
			</main>
		</AuthLayout>
	);
}
