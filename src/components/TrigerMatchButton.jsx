import { useDispatch, useSelector } from 'react-redux';
import ThemeButton from '../stories/components/ThemeButton';
import { motion } from 'framer-motion';
import { useState } from 'react';
import supabase from '../Services/Supabase';
import { InvitationStatus } from '../Utils';
import { ModelType, handleModel } from '../redux/Slices/Model.slice';
import ModelWrapper from '../stories/components/Models/Wrappers/ModelWrapper';
import PairingTriggeredModelContent from '../stories/components/Models/Contents/PairingTriggeredModelContent';
import { setCurrentEvent } from '../redux/Slices/Event.slice';
import SpinnerLoader from './loaders/SpinnerLoader';

export default function TrigerMatchButton() {
	const BACKEND_BASE_URL =
		import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_BACKEND_PROD_BASE_URL : import.meta.env.VITE_BACKEND_DEV_BASE_URL;
	const dispatch = useDispatch();
	const pairingTriggeredModel = useSelector((data) => data?.model?.triggerPairingModel);
	const [loading, setLoading] = useState(false);
	const currentUserId = useSelector((data) => data?.user?.userData?.id);
	const invites = useSelector((data) => data.invites.invitees);
	const event = useSelector((data) => data?.events?.currentEvent);
	const currentDate = new Date();
	const eventDate = new Date(event?.date);
	const isEventPassed = currentDate >= eventDate ? true : false;
	function reverseArr(arr) {
		let reversedArr = [...arr];
		return reversedArr.reverse();
	}

	async function getIdProfiles(emails) {
		try {
			const { data, error } = await supabase.from('Profiles').select('id,name,email,Wishlist(name,url)').in('email', emails);
			if (!error) {
				return data;
			} else {
				console.log('Error encountered while getting ids from profiles : ', error);
			}
		} catch (error) {
			console.log(error);
		}
	}
	const triggerMatch = async () => {
		if (invites.filter((item) => item.status == InvitationStatus.accepted).length % 2 != 0) {
			dispatch(handleModel({ type: ModelType.triggerPairingModel, value: true }));
			return;
		}
		try {
			setLoading(true);
			let pairs = [];
			const participatentsEmails = invites?.filter((invite) => invite?.status === InvitationStatus?.accepted)?.map((item) => item?.email);
			const participantsIds = await getIdProfiles(participatentsEmails);
			const reversedArr = reverseArr(participantsIds);
			for (let i = 0; i < reversedArr.length; i++) {
				const receiver = participantsIds[i];
				const santa = reversedArr[i];
				const pair = {
					event: {
						id: event?.id,
						name: event?.name,
						date: event?.date,
					},
					pairedTo: {
						id: receiver?.id,
						name: receiver?.name,
						email: receiver?.email,
						wishlist: receiver?.Wishlist,
					},
					santa: {
						id: santa?.id,
						name: santa?.name,
						email: santa?.email,
					},
				};
				pairs.push(pair);
			}
			handlePairing(pairs);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	async function updateEvent() {
		try {
			const { data, error } = await supabase
				.from('Events')
				.update({
					pairingTriggered: true,
				})
				.match({ id: event?.id })
				.select('id,date,name,sendReminder,ownerId,pairingTriggered');
			if (!error) {
				dispatch(setCurrentEvent(...data));
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	}
	async function handlePairing(pairs) {
		try {
			const { data, error } = await supabase.from('Pairings').insert(
				pairs.map((item) => {
					const { event, pairedTo, santa } = item;
					const data = {
						eventId: event.id,
						santaId: santa.id,
						personId: pairedTo.id,
					};
					return data;
				})
			);
			if (!error) {
				updateEvent();
				sendEmailToParticipants(pairs);
			} else {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
	}
	async function sendEmailToParticipants(pairs) {
		try {
			const res = await fetch(`${BACKEND_BASE_URL}/send-email/handle-pairing`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(pairs),
			});
			if (res.ok) {
				console.log('success');
			} else {
				console.log(res);
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<>
			{!isEventPassed && event?.ownerId === currentUserId && !event.pairingTriggered && (
				<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
					<ThemeButton size={'sm'} className={'w-full flex items-center justify-between gap-4'} onClick={triggerMatch}>
						Match
						{loading && <SpinnerLoader />}
					</ThemeButton>
				</motion.div>
			)}

			<ModelWrapper isModelVisible={pairingTriggeredModel}>
				<PairingTriggeredModelContent />
			</ModelWrapper>
		</>
	);
}
