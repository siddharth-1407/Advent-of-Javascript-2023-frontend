import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Icon from './Icon';
import { motion } from 'framer-motion';
import { InvitationStatus } from '../../Utils';

export default function InvitationCard({ avatar, name, type, email, status, isSanta, isCloseShowing, handleClose, anonymous }) {
	return (
		<div className='w-full h-fit lg:min-w-64 flex justify-end'>
			<div
				className={`w-full h-20 md:h-28 md:pr-2 flex justify-between rounded-lg ${anonymous ? 'bg-turquoiseGreen dark:bg-blackPearl/80' : 'bg-white '}`}>
				<div className='w-full flex items-center gap-1 pr-2 md:pr-6'>
					<div className='-translate-x-5 md:hidden'>
						<Avatar name={name} src={avatar} size='md' status={status} type={anonymous ? 'anonymous' : type} santaHat={isSanta} />
					</div>
					<div className='-translate-x-5 hidden md:block '>
						<Avatar name={name} src={avatar} size='lg' status={status} type={anonymous ? 'anonymous' : type} santaHat={isSanta} />
					</div>
					<div className='w-full flex-1 flex flex-col justify-between text-black overflow-hidden'>
						{anonymous ? (
							<div className='flex flex-col gap-2 w-full'>
								<div className='h-6 sm:h-8 md:h-6 lg:h-8 w-full lg:min-w-14 bg-spanishGreen/30 dark:bg-nileBlue/30'></div>
								<div className='h-3 sm:h-4 md:h-3 lg:h-4 w-1/2 lg:min-w-14 bg-spanishGreen/30 dark:bg-nileBlue/30'></div>
							</div>
						) : (
							<>
								<p className='text-2xl md:text-3xl font-bold line-clamp-1'>{name}</p>
								<p className='text-sm md:text-base line-clamp-1'>{email}</p>
							</>
						)}
					</div>
				</div>
				{isCloseShowing && (
					<div className='flex self-start pt-2  '>
						<motion.button
							onClick={() => handleClose()}
							whileTap={{ scale: 0.9 }}
							whileHover={{ fill: '#000000', transition: { duration: 0.15 } }}
							className='bg-transparent h-fit fill-bombay'>
							<Icon type={'close'} color='#aeaeae' className='fill-inherit' />
						</motion.button>
					</div>
				)}
			</div>
		</div>
	);
}

InvitationCard.propTypes = {
	avatar: PropTypes.string,
	name: PropTypes.string.isRequired,
	email: PropTypes.string,
	type: PropTypes.oneOf(['initial', 'profile', 'anonymous']),
	status: PropTypes.oneOf([InvitationStatus.accepted, InvitationStatus.pending, InvitationStatus.declined, 'NONE']),
	isSanta: PropTypes.bool,
	isCloseShowing: PropTypes.bool,
	handleClose: PropTypes.func,
	anonymous: PropTypes.bool,
};
