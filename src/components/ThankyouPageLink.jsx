import React from 'react';
import { useSelector } from 'react-redux';
import ThemeButton from '../stories/components/ThemeButton';

export default function ThankyouPageLink() {
	const event = useSelector((data) => data?.events?.currentEvent);
	const currentDate = new Date();
	const eventDate = new Date(event?.date);
	const isEventPassed = currentDate > eventDate ? true : false;
	return (
		<>
			{event && isEventPassed && (
				<ThemeButton size={'sm'} link to={'thankyou'}>
					Say Thankyou
				</ThemeButton>
			)}
		</>
	);
}
