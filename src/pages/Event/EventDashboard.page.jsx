import React, { useEffect, useState } from 'react';
import InteriorLayout from '../../components/layouts/Interior/InteriorLayout';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { getEvent } from '../../redux/Slices/Event.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { InvitationStatus, handleCountdownString } from '../../Utils';
import ThemeButton from '../../stories/components/ThemeButton';
import DrawerWrapper from '../../components/Drawer/DrawerWrapper/DrawerWrapper';
import WishListContent from '../../components/Drawer/DrawerContent/WishListContent';
import CountdownWithTitle from '../../components/CountdownWithTitle';
import TrigerMatchButton from '../../components/TrigerMatchButton';
import PairingsList from '../../components/Lists/PairingsList';
import FilterInvitesComponent from '../../components/FilterInvitesComponent';
import { getInvites } from '../../redux/Slices/InviteList.slice';
import { getPairings } from '../../redux/Slices/Pairings.slice';
import { getWishlist } from '../../redux/Slices/Wishlist.slice';
import ThankyouPageLink from '../../components/ThankyouPageLink';
import Accordion from '../../stories/components/Accordion/Accordion';
import InvitationCard from '../../stories/components/InvitationCard';

export default function Dashboard() {
	const params = useParams();
	const dispatch = useDispatch();
	const CurrentUserId = useSelector((data) => data?.user?.userData?.id);
	const event = useSelector((data) => data?.events?.currentEvent);
	const eventLoading = useSelector((data) => data?.events?.loading);
	const [countdown, setCountdown] = useState('');
	const [IsEventPassed, setIsEventPassed] = useState(false);
	const [wishlistDrawer, setWishlistDrawer] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const eventName = params?.event?.replace(/-/g, ' ');
		if (Object.keys(event).length == 0 || (Object.keys(event).length > 0 && event?.name !== eventName)) {
			dispatch(getEvent(eventName));
		}
	}, []);
	useEffect(() => {
		if (Object.keys(event).length == 0 && !eventLoading) {
			navigate('/not-found');
		} else {
			const currentDate = new Date();
			const eventDate = new Date(event?.date);
			if (currentDate > eventDate) setIsEventPassed(true);
			setCountdown(handleCountdownString(event?.date));
			dispatch(getWishlist({ userId: CurrentUserId, eventId: event?.id }));
			if (event.pairingTriggered) {
				dispatch(getPairings(event.id));
			} else {
				dispatch(getInvites(event.id));
			}
		}
	}, [event]);

	return (
		<>
			<InteriorLayout>
				<div className='pt-8 flex flex-col gap-6 lg:ml-16 sm:ml-4'>
					<section className='flex flex-col sm:flex-row justify-between sm:items-center'>
						<CountdownWithTitle countdownString={countdown} eventName={event?.name} />
						<div className='flex flex-col items-end gap-2 '>
							{event && (
								<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
									<ThemeButton size={'sm'} onClick={() => setWishlistDrawer(true)}>
										Wishlist
									</ThemeButton>
								</motion.div>
							)}
							<TrigerMatchButton />
							<ThankyouPageLink />
						</div>
					</section>
					<section className='pl-4 lg:pl-0 mt-6'>
						{event && (event.pairingTriggered || IsEventPassed) ? <PairingListWithAccordions /> : <FilterInvitesComponent />}
					</section>
				</div>
			</InteriorLayout>
			<DrawerWrapper setOpen={setWishlistDrawer} open={wishlistDrawer}>
				<WishListContent setOpen={setWishlistDrawer} open={wishlistDrawer} />
			</DrawerWrapper>
		</>
	);
}

export function PairingListWithAccordions() {
	const dispatch = useDispatch();
	const event = useSelector((data) => data?.events?.currentEvent);
	useEffect(() => {
		dispatch(getInvites(event?.id));
	}, [event]);
	const invites = useSelector((data) => data?.invites?.invitees);
	const [failedRSVP, setFailedRSVP] = useState((invites) => invites?.filter((item) => item.status == InvitationStatus.pending));
	const [declinedToParticipate, setDeclinedToParticipate] = useState((invites) =>
		invites?.filter((item) => item.status == InvitationStatus.declined)
	);

	useEffect(() => {
		setFailedRSVP(invites?.filter((item) => item.status == InvitationStatus.pending));
		setDeclinedToParticipate(invites?.filter((item) => item.status == InvitationStatus.declined));
	}, [invites]);
	return (
		<>
			<PairingsList />
			<Accordion title='Failed to RSVP'>
				<ul className='pl-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 md:gap-24'>
					{failedRSVP &&
						failedRSVP.length > 0 &&
						failedRSVP.map((item) => {
							const { name, email, status, avatar } = item;
							return (
								<li className='w-full'>
									<InvitationCard name={name} avatar={avatar} email={email} status={status} type={avatar ? 'profile' : 'initial'} />
								</li>
							);
						})}
				</ul>
			</Accordion>
			<Accordion title='Declined to participate'>
				<ul className='pl-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 md:gap-24'>
					{declinedToParticipate &&
						declinedToParticipate.length > 0 &&
						declinedToParticipate.map((item) => {
							const { name, email, status, avatar } = item;
							return (
								<li className='w-full'>
									<InvitationCard name={name} avatar={avatar} email={email} status={status} type={avatar ? 'profile' : 'initial'} />
								</li>
							);
						})}
				</ul>
			</Accordion>
		</>
	);
}
