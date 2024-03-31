import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ModelType, handleModel } from '../../../../redux/Slices/Model.slice';
import { useDispatch } from 'react-redux';

export default function PairingTriggeredModelContent() {
	const dispatch = useDispatch();
	return (
		<section
			role='dialog'
			className='p-6 sm:pb-10 border-2 relative -left-0.5 sm:static sm:border-6 rounded border-white text-white bg-orangeRed flex flex-col items-center justify-center w-full  sm:max-w-lg md:max-w-2xl lg:max-w-2xl 2xl:max-w-3xl'>
			<div className='w-full flex flex-col gap-8'>
				<div className='flex-1 pt-4'>
					<p className='text-center font-bold text-2xl sm:text-3xl'>
						You need an "Even" number of participants to trigger a match. Either add another participant or remove one
					</p>
				</div>
				<div className='flex flex-col gap-2 justify-center items-center'>
					<span className='text-xl font-handwriting font-bold '></span>
					<strong className='line-clamp-2 text-6xl lg:text-7xl font-condensed font-bold text-center'></strong>
				</div>
				<div className='font-bold flex justify-center gap-4'>
					<motion.button
						onClick={() => dispatch(handleModel({ type: ModelType.triggerPairingModel, value: false }))}
						whileTap={{ scale: 0.9 }}
						whileHover={{
							borderColor: 'white',
						}}
						className='text-white uppercase underline rounded-full px-6 py-2 border-2 border-transparent transition-colors'>
						Close
					</motion.button>
				</div>
			</div>
		</section>
	);
}
