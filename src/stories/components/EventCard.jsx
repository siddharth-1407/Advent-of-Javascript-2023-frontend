import React from 'react';
import { handleCountdownString } from '../../Utils';
import ThemeButton from './ThemeButton';

export default function EventCard({ data }) {
	const date = handleCountdownString(data?.date);
	const eventPath = data?.name?.replace(/\s/g, '-');
	return (
		<article className='py-6 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between sm:items-center'>
			<CountdownAndTitle countdownString={date} eventName={data?.name} />
			<ThemeButton size={'sm'} link to={`/events/${eventPath}`} className={'text-sm block font-sans font-semibold'}>
				view
			</ThemeButton>
		</article>
	);
}

function CountdownAndTitle({ countdownString, eventName }) {
	return (
		<div id='event-heading'>
			<p className='text-white uppercase flex flex-col'>
				<span className='text-2xl  sm:text-3xl 2xl:text-3xl font-handwriting'>{countdownString}</span>
				<strong className='text-6xl sm:text-7xl 2xl:text-8xl 2xl:tracking-wide font-condensed line-clamp-1'>{eventName}</strong>
			</p>
		</div>
	);
}
