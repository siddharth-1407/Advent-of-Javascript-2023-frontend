import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ThemeButton from '../../stories/components/ThemeButton';
import { useDispatch, useSelector } from 'react-redux';
import { handleEvent } from '../../redux/Slices/Drawers.slice';

export default function EditEventButton() {
	const dispatch = useDispatch();
	const event = useSelector((data) => data?.events?.currentEvent);
	const [IsEventPassed, setIsEventPassed] = useState(false);
	useEffect(() => {
		if (Object.entries(event).length > 0) {
			const currentDate = new Date();
			const eventDate = new Date(event?.date);
			if (currentDate < eventDate || event?.pairingTriggered) setIsEventPassed(true);
		}
	}, [event]);
	return (
		<>
			{!IsEventPassed && (
				<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
					<ThemeButton size={'sm'} onClick={() => dispatch(handleEvent(true))}>
						Edit
					</ThemeButton>
				</motion.div>
			)}
		</>
	);
}
