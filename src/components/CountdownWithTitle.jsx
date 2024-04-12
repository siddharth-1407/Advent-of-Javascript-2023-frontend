export default function CountdownWithTitle({ countdownString, eventName }) {
	return (
		<div id='event-heading'>
			<p className='text-white uppercase flex flex-col'>
				<span className='text-2xl  sm:text-3xl  2xl:text-4xl font-handwriting'>{countdownString}</span>
				<strong className='text-6xl sm:text-7xl  2xl:text-9xl 2xl:tracking-wide font-condensed'>{eventName}</strong>
			</p>
		</div>
	);
}
