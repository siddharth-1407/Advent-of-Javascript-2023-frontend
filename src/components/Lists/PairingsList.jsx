import React, { useEffect, useState } from 'react';
import { motion, animate, stagger } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getPairings } from '../../redux/Slices/Pairings.slice';
import MatchListItem from '../../stories/components/MatchListItem';
import supabase from '../../Services/Supabase';
import SnowFlakeLoader from '../../stories/components/Loaders/SnowFlakeLoader';

export default function PairingsList() {
	const dispatch = useDispatch();
	const currentUserId = useSelector((data) => data?.user?.userData?.id);
	const event = useSelector((data) => data?.events?.currentEvent);
	const pairings = useSelector((data) => data?.pairings?.pairing);
	const pairingsLoading = useSelector((data) => data?.pairings?.loading);
	const [pairs, setPairs] = useState([]);
	useEffect(() => {
		animate('li', { opacity: 1 }, { delay: stagger(0.1) });
	}, []);
	useEffect(() => {
		if (event) {
			dispatch(getPairings(event?.id));
		}
	}, [event]);
	useEffect(() => {
		if (!pairings) return;
		async function getProfileWithId(id) {
			try {
				const { data, error } = await supabase.from('Profiles').select('id,name,avatar,email').match({
					id,
				});
				if (!error) {
					return data[0];
				} else {
					console.log('Error getting profile - ', error);
				}
			} catch (error) {
				console.log(error);
			}
		}
		async function processPairing() {
			let array = [];
			let currentUserPair;
			for (const item of pairings) {
				const santaProfile = await getProfileWithId(item.santaId);
				const personProfile = await getProfileWithId(item.personId);
				if (item.santaId == currentUserId) {
					currentUserPair = { ...item, santaProfile, personProfile };
					array.unshift(currentUserPair);
				} else {
					const data = { ...item, santaProfile, personProfile };
					array.push(data);
				}
			}
			setPairs(array);
		}
		processPairing();
	}, [pairings]);

	return (
		<>
			{pairingsLoading ? (
				<SnowFlakeLoader />
			) : (
				<motion.ul className='flex flex-col gap-6'>
					{pairs &&
						pairs.length > 0 &&
						pairs.map((pair, i) => {
							return (
								<motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={pair.id}>
									<MatchListItem data={pair} index={i + 1} />
								</motion.li>
							);
						})}
				</motion.ul>
			)}
		</>
	);
}
