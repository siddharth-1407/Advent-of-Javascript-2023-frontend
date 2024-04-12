import React, { useEffect, useState } from 'react';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import InvitationReqBtn from '../../stories/components/InvitationReqButtons/InvitationReqBtn';
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';
import supabase from '../../Services/Supabase';
import AuthTitle from '../../components/layouts/Auth/AuthTitle';
import { InvitationStatus } from '../../Utils';
import { Helmet } from 'react-helmet';
import axios from 'axios';

export default function Rsvp_page() {
	const BACKEND_BASE_URL =
		import.meta.env.MODE === 'production' ? import.meta.env.VITE_BACKEND_PROD_BASE_URL : import.meta.env.VITE_BACKEND_DEV_BASE_URL;
	const [redirectTo_on_Decline, setRedirectTo_on_Decline] = useState('');
	const params = useParams();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [event, setEvent] = useState(null);
	const [user, setUser] = useState(null);
	// example invite url for an event named "christmas" : BASEURL/christmas/invitation/?id=[invite_id]&eventId=[event_id]&event-date=[event_date]
	const eventName = params?.event.replace(/[-]/g, ' ');
	const id = searchParams.get('id');
	const eventId = searchParams.get('eventId');
	const eventDate = searchParams.get('event-date');
	const location = useLocation();
	useEffect(() => {
		if (!id || !eventId) {
			navigate('/not-found');
		}
	}, []);
	useEffect(() => {
		async function getEventData() {
			const { data, error } = await supabase.from('Events').select('id,name,date,pairingTriggered').match({
				id: eventId,
			});
			if (!error && data) {
				setEvent(...data);
			} else {
				navigate('/not-found');
			}
		}
		async function getInvitedUser(event) {
			try {
				const { data, error } = await supabase.from('Invites').select('id,email,status,updated_at').match({
					id,
					eventId,
				});
				if (!error) {
					if (data?.length == 0) {
						navigate('/not-found');
					}
					setUser(...data);
					const lastUpdatedAtTime = new Date(data[0]?.updated_at).getTime();
					const currentTime = new Date().getTime();
					if (currentTime > lastUpdatedAtTime + 30 * 60 * 1000) {
						navigate('/link-expired');
					}
				} else {
					console.log('Error while getting invited user data : ', error);
				}
			} catch (error) {
				console.log('Error - ', error);
			}
		}
		getEventData();
		getInvitedUser();
	}, []);

	useEffect(() => {
		if (user) {
			const redirect_Link_on_Decline = location.pathname.replace('invitation', 'you-will-be-missed') + `?id=${id}&eventId=${eventId}`;
			setRedirectTo_on_Decline(redirect_Link_on_Decline);
			if (user.status === InvitationStatus.accepted) {
				navigate(location.pathname.replace(/(invitation)/, ''));
			} else if (user?.status === InvitationStatus.declined) {
				navigate(redirect_Link_on_Decline);
			}
		}
	}, [user]);

	async function handleAccept() {
		try {
			const InvitedUserData = {
				id,
				eventId,
				status: InvitationStatus.accepted,
			};
			const res = await axios.post(`${BACKEND_BASE_URL}/invites/update-invite`, InvitedUserData, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (res.status == 200) {
				navigate(`/register/?id=${id}&eventId=${eventId}`);
			} else {
				if ((res.status = 404)) {
					navigate('/not-found');
				} else {
					navigate('/server-error');
				}
			}
		} catch (error) {
			console.log(BACKEND_BASE_URL);
			console.log(error);
			navigate('/server-error');
		}
	}
	async function handleDecline() {
		try {
			const res = await fetch(`${BACKEND_BASE_URL}/invites/update-invite`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id,
					eventId,
					status: InvitationStatus.declined,
				}),
			});
			const data = await res.json();
			if (res.ok) {
				navigate(redirectTo_on_Decline);
			} else {
				console.error(data.message);
				if ((res.status = 404)) {
					navigate('/not-found');
				} else {
					navigate('/server-error');
				}
			}
		} catch (error) {
			navigate('/server-error');
		}
	}
	return (
		<AuthLayout>
			<Helmet>
				<title>{`${event?.name} - Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, ${event?.name}, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`${event?.name} - Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`${event?.name} - Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<main className='w-full flex flex-col justify-center items-center gap-10 2xl:gap-16'>
				{user && (
					<>
						<div className='flex flex-col items-center gap-1'>
							<div className='hidden md:block'>
								<AuthTitle title={"You're invited to"} />
							</div>
							<div className='block md:hidden'>
								<h1 className='text-5xl text-white font-condensed font-bold '>You're invited to</h1>
							</div>
							<strong className='uppercase font-condensed text-white text-6xl sm:text-7xl 2xl:text-8xl'>
								{event?.name || eventName}
							</strong>
							<p className='sm:mt-1 uppercase font-handwriting text-white text-lg sm:text-xl 2xl:text-2xl'>{eventDate}</p>
						</div>
						<section className='max-w-xl 2xl:max-w-2xl w-full flex justify-between'>
							<div className='w-full flex flex-col md:flex-row gap-8 '>
								<div className='w-full'>
									<InvitationReqBtn type={'accept'} action={handleAccept} />
								</div>
								<div className='w-full'>
									<InvitationReqBtn type={'decline'} action={handleDecline} />
								</div>
							</div>
						</section>
					</>
				)}
			</main>
		</AuthLayout>
	);
}
