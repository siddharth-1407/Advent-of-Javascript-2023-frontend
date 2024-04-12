import React, { useEffect, useState } from 'react';
import InteriorLayout from '../../components/layouts/Interior/InteriorLayout';
import ThemeButton from '../../stories/components/ThemeButton';
import DrawerWrapper from '../../components/Drawer/DrawerWrapper/DrawerWrapper';
import UpdateEventContent from '../../components/Drawer/DrawerContent/UpdateEventContent';
import { InviteGroupForm } from '../../components/Forms';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getInvites } from '../../redux/Slices/InviteList.slice';
import { getEvent } from '../../redux/Slices/Event.slice';
import { handleCountdownString } from '../../Utils';
import InvitesList from '../../components/Lists/InvitesList';
import CountdownWithTitle from '../../components/CountdownWithTitle';
import ModelWrapper from '../../stories/components/Models/Wrappers/ModelWrapper';
import RemoveCardModelContent from '../../stories/components/Models/Contents/RemoveCardModelContent';
import { Helmet } from 'react-helmet';

export default function InvitePeople() {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [eventDrawer, setEventDrawer] = useState(false);
	const [countdownString, setCountdownString] = useState(null);
	const [isEventPassed, setIsEventPassed] = useState(false);
	const invitees = useSelector((data) => data?.invites.invitees);
	const model = useSelector((data) => data?.model.deleteInviteModel);
	const event = useSelector((data) => data?.events.currentEvent);

	useEffect(() => {
		const eventId = params.event.replace(/\-/g, ' ');
		dispatch(getEvent(eventId));
	}, []);
	useEffect(() => {
		if (!event) {
			navigate('/not-found');
		}
		dispatch(getInvites(event?.id));
		setCountdownString(handleCountdownString(event?.date));
		dispatch(getInvites(event?.id));
		if (event?.pairingTriggered) {
			navigate(`/events/${params.event}`);
		}
		const eventDate = new Date(event?.date);
		const currentDate = new Date();
		if (currentDate > eventDate) {
			setIsEventPassed(true);
		}
	}, [event]);

	return (
		<InteriorLayout>
			<Helmet>
				<title>{`Invite - ${event.name} | Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, invite , ${event.name}, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Invite - ${event.name} | Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Invite - ${event.name} | Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<div className='flex flex-col gap-6 lg:ml-16'>
				<section className='flex flex-col sm:flex-row justify-between sm:items-center'>
					<CountdownWithTitle countdownString={countdownString} eventName={event?.name} />
					<div>
						{event && !isEventPassed && (
							<ThemeButton size={'sm'} className={'w-full font-sans font-bold'} onClick={() => setEventDrawer(true)}>
								EDIT
							</ThemeButton>
						)}
					</div>
				</section>
				<section className='w-full flex flex-col gap-6 mb-12'>
					<InviteGroupForm eventId={event?.id} />
					<div className='pl-4 lg:p-0'>
						<InvitesList invitees={invitees} />
					</div>
				</section>
			</div>
			<DrawerWrapper setOpen={setEventDrawer} open={eventDrawer}>
				<UpdateEventContent setOpen={setEventDrawer} open={eventDrawer} />
			</DrawerWrapper>
			<ModelWrapper isModelVisible={model}>
				<RemoveCardModelContent />
			</ModelWrapper>
		</InteriorLayout>
	);
}
