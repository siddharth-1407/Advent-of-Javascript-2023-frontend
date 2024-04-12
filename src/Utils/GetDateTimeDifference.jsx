export function getDateTimeDifference(date) {
	const currentDate = new Date();
	const eventDate = new Date(date);
	const timeDiff = eventDate - currentDate;
	let daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	if (daysDiff > 0) {
		const weeks = Math.floor(daysDiff / 7);
		const days = daysDiff - weeks * 7;
		return days ? `${weeks} weeks & ${days} days until` : `${weeks} weeks until`;
	} else {
		return eventDate.toLocaleDateString('en-US', {
			dateStyle: 'long',
		});
	}
}
export function handleCountdownString(date) {
	return getDateTimeDifference(date);
}
