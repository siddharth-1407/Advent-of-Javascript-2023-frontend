import PropTypes from 'prop-types'; //
import Icon from './Icon';
import { InvitationStatus } from '../../Utils';

export default function Indicator({ type, size = 48 }) {
	let wrapperStyles;
	let IconType;
	let textColor;
	switch (type) {
		case InvitationStatus.declined:
			wrapperStyles = 'w-fit h-fit flex justify-center items-center rounded-full bg-orangeRed fill-white border-white border-2';
			IconType = 'minus';
			break;
		case InvitationStatus.pending:
			wrapperStyles = 'w-fit h-fit flex justify-center items-center rounded-full bg-supernova fill-black border-white border-2';
			IconType = 'question';
			break;
		case InvitationStatus.accepted:
			wrapperStyles = 'w-fit h-fit flex justify-center items-center rounded-full bg-spanishGreen fill-white border-white border-2';
			IconType = 'check';
			break;
	}
	return (
		<>
			{type !== 'none' && (
				<div className={wrapperStyles}>
					<Icon type={IconType} size={size / 2} color={textColor} />
				</div>
			)}
		</>
	);
}
Indicator.propTypes = {
	type: PropTypes.oneOf([InvitationStatus.accepted, InvitationStatus.pending, InvitationStatus.declined, 'NONE']).isRequired,
	size: PropTypes.number.isRequired,
};
