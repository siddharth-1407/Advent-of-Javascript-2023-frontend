import PropTypes from 'prop-types'; //
import Icon from './Icon';
import Indicator from './Indicator';
import { InvitationStatus } from '../../Utils';

export default function Avatar({ name, src, type = 'initial', status = 'NONE', size = 'md', santaHat = false }) {
	let sizeStyles;
	let IconSize;
	let SantaHat_Styles;
	let Indicator_styles;
	switch (size) {
		case 'sm':
			sizeStyles =
				'w-10 h-10 rounded-full overflow-hidden border-2 text-2xl flex justify-center items-center bg-spanishGreen text-white font-bold';
			SantaHat_Styles = 'absolute -top-2 -right-1';
			Indicator_styles = 'absolute bottom-0 -right-1';
			IconSize = 20;
			break;
		case 'md':
			sizeStyles =
				'w-14 h-14 rounded-full overflow-hidden border-4 text-3xl flex justify-center items-center bg-spanishGreen text-white font-bold';
			SantaHat_Styles = 'absolute -top-3 -right-2';
			Indicator_styles = 'absolute bottom-1 -right-1';
			IconSize = 28;
			break;
		case 'lg':
			sizeStyles =
				'w-20 h-20 rounded-full overflow-hidden border-6 text-5xl flex justify-center items-center bg-spanishGreen text-white font-bold';
			SantaHat_Styles = 'absolute -top-4 -right-3';
			Indicator_styles = 'absolute bottom-1 -right-0';
			IconSize = 40;
			break;

		default:
			sizeStyles =
				'w-14 h-14 rounded-full overflow-hidden border-4 text-3xl flex justify-center items-center bg-spanishGreen text-white font-bold';
			SantaHat_Styles = 'absolute -top-4 -right-3';
			IconSize = 28;

			break;
	}
	return (
		<div className='inline-block relative'>
			{type === 'profile' && (
				<div className={`${sizeStyles}  border-white`}>
					<img src={src} alt={`${name}`} width={IconSize * 2} height={IconSize * 2} className={`object-cover h-full`} />
				</div>
			)}
			{type === 'initial' && <div className={`${sizeStyles}  border-white`}>{name.slice(0, 1)}</div>}
			{type === 'anonymous' && (
				<div className={`${sizeStyles} flex justify-center items-center bg-spanishGreen dark:bg-nileBlue text-white font-bold border-vistaBlue dark:border-blackPearl/80`}>
					<Icon type='eyeClosed' className='fill-white' size={IconSize} />
				</div>
			)}
			{santaHat && <img src='/overlays/santa-hat.png' width={IconSize * 1.5} height={IconSize * 1.5} className={SantaHat_Styles} />}
			{status !== 'none' && (
				<div className={Indicator_styles}>
					<Indicator type={status} size={IconSize} color={status} />
				</div>
			)}
		</div>
	);
}
Avatar.propTypes = {
	name: PropTypes.string.isRequired,
	src: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md', 'lg']).isRequired,
	type: PropTypes.oneOf(['initial', 'profile', 'anonymous']),
	status: PropTypes.oneOf([InvitationStatus.accepted, InvitationStatus.pending, InvitationStatus.declined, 'NONE']),
	santaHat: PropTypes.bool,
};
