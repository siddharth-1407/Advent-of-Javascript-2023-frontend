import React, { useEffect, useState } from 'react';
import InteriorLayout from '../../components/layouts/Interior/InteriorLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../../redux/Slices/Event.slice';
import { useNavigate, useParams } from 'react-router-dom';
import { InvitationStatus, handleCountdownString } from '../../Utils';
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
import ModelWrapper from '../../stories/components/Models/Wrappers/ModelWrapper';
import RemoveCardModelContent from '../../stories/components/Models/Contents/RemoveCardModelContent';
import DeleteEventModelContent from '../../stories/components/Models/Contents/DeleteEventModelContent';
import WishlistButton from '../../components/Buttons/WishlistButton';
import EditEventButton from '../../components/Buttons/EditEventButton';
import { handleEvent } from '../../redux/Slices/Drawers.slice';
import UpdateEventContent from '../../components/Drawer/DrawerContent/UpdateEventContent';
import { Helmet } from 'react-helmet';

export default function Dashboard() {
	const params = useParams();
	const dispatch = useDispatch();
	const CurrentUserId = useSelector((data) => data?.user?.userData?.id);
	const event = useSelector((data) => data?.events?.currentEvent);
	const eventLoading = useSelector((data) => data?.events?.loading);
	const deleteInviteModel = useSelector((data) => data?.model?.deleteInviteModel);
	const eventModel = useSelector((data) => data?.model?.deleteEventModel);
	const eventDrawer = useSelector((data) => data?.drawers?.event);
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
				<Helmet>
					<title>{`${event.name} | Secret Santa`}</title>
					<meta
						name='description'
						content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
					/>
					<meta name='keywords' content={`Secret Santa, ${event.name}, events, holiday, gift exchange, christmas, new year`} />
					<meta property='og:title' content={`${event.name} | Secret Santa`}></meta>
					<meta
						property='og:description'
						content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
					/>
					<meta name='twitter:title' content={`${event.name} | Secret Santa`} />
					<meta
						name='twitter:description'
						content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
				</Helmet>
				<div className='pt-8 flex flex-col gap-6 lg:ml-16 sm:ml-4'>
					<section className='flex flex-col sm:flex-row justify-between sm:items-center'>
						<CountdownWithTitle countdownString={countdown} eventName={event?.name} />
						<div className='flex flex-col items-end gap-2 '>
							<EditEventButton />
							<WishlistButton setWishlistDrawer={setWishlistDrawer} />
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
			<DrawerWrapper setOpen={() => dispatch(handleEvent(false))} open={eventDrawer}>
				<UpdateEventContent setOpen={() => dispatch(handleEvent(false))} open={eventDrawer} />
			</DrawerWrapper>
			<ModelWrapper isModelVisible={deleteInviteModel}>
				<RemoveCardModelContent />
			</ModelWrapper>
			<ModelWrapper isModelVisible={eventModel}>
				<DeleteEventModelContent />
			</ModelWrapper>
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
