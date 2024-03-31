import PropTypes from 'prop-types'; //
export default function Icon({ type, size = 24, color = 'black', className = 'fill-inherit flex justify-center items-center' }) {
	return (
		<svg width={size} height={size} fill={color} className={className}>
			<use href={`/icons/sprite.svg#${type}`} />
		</svg>
	);
}
Icon.propTypes = {
	type: PropTypes.oneOf([
		'calender',
		'check',
		'chevron',
		'close',
		'edit',
		'eyeClosed',
		'eyeOpened',
		'logout',
		'minus',
		'plus',
		'question',
		'thumbsUp',
		'thumbsDown',
		'upload',
		'user',
		'delete',
	]).isRequired,
	color: PropTypes.string,
	size: PropTypes.number,
	className: PropTypes.string,
};
