import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { motion } from 'framer-motion';

export default function InvitationReqBtn({ type, action }) {



	return (
		<motion.button
			onClick={action}
			whileTap={{
				scale: 0.9,
			}}
			className={`w-full group rounded-l-full hover:shadow-2xl shadow-2xl ${
				type == 'decline' ? 'hover:shadow-orangeRed' : 'hover:shadow-green-800 dark:hover:shadow-green-500'
			} transition-shadow`}>
			<div className=' flex items-center relative'>
				<div className='absolute left-0 rounded-full flex justify-center items-center overflow-hidden'>
					<ReqButtonIcon type={type} />
				</div>
				<div className='w-full rounded-l-full overflow-hidden'>
					<div className='w-full py-3 h-12 lg:h-16 2xl:h-[74px] text-xl sm:leading-4 lg:leading-6 2xl:leading-6 flex justify-center items-center text-start font-bold capitalize pl-12 sm:pl-16 lg:pl-[5.5rem] 2xl:pl-28 pr-2 sm:pr-3 lg:pr-8 2xl:pr-10  rounded-r-lg bg-white'>
						{type === 'accept' ? (
						<span className='whitespace-nowrap'>I'll be there!</span>
					) : (
						<span className='whitespace-nowrap'>
							regretfully
							<br className='hidden sm:block' /> decline
						</span>
					)}
					</div>
					
				</div>
			</div>
			<div></div>
		</motion.button>
	);
}
InvitationReqBtn.propTypes = {
	type: PropTypes.oneOf(['accept', 'decline']),
	action: PropTypes.func,
};

function ReqButtonIcon({ type }) {
	return (
		<>
			{type === 'accept' && (
				<div className='w-16 lg:w-20 2xl:w-24 h-16 lg:h-20 2xl:h-24 rounded-full border-2 sm:border-3 lg:border-4 border-white overflow-hidden flex justify-center items-center bg-spanishGreen'>
					<Icon type={'thumbsUp'} className='fill-white w-9 h-9 lg:w-12 2xl:w-14 lg:h-12 2xl:h-14' />
				</div>
			)}
			{type === 'decline' && (
				<div className='pt-1 w-16 lg:w-20 2xl:w-24 h-16 lg:h-20 2xl:h-24 rounded-full border-2 sm:border-3 lg:border-4 border-white overflow-hidden flex justify-center items-center bg-orangeRed'>
					<Icon type={'thumbsDown'} className='fill-white w-9 h-9 lg:w-12 2xl:w-14 lg:h-12 2xl:h-14' />
				</div>
			)}
		</>
	);
}

ReqButtonIcon.propTypes = {
	type: PropTypes.oneOf(['accept', 'decline']),
};
