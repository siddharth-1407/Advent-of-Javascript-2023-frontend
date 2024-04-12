import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import cn from '../../Utils/Cn';
import { InvitationStatus } from '../../Utils';

export default function FilterButtons({ filter, length, onClickAction, active }) {
	const whileTab = { scale: 0.9 };
	const ButtonVariants = cva('relative rounded-3xl', {
		variants: {
			filter: {
				ACCEPTED: 'bg-spanishGreen',
				PENDING: 'bg-supernova',
				DECLINED: 'bg-fireEngineRed',
			},
		},
		defaultVariants: {
			filter: 'ACCEPTED',
		},
	});
	const SvgVariants = cva('select-none cursor-pointer', {
		variants: {
			filter: {
				ACCEPTED: active ? 'fill-[#004429] stroke-[#7f7f7f]' : 'fill-spanishGreen stroke-white',
				PENDING: active ? 'fill-[#7c6400] stroke-[#7f7f7f]' : 'fill-supernova stroke-white',
				DECLINED: active ? 'fill-[#621212] stroke-[#7f7f7f]' : 'fill-fireEngineRed  stroke-white',
			},
		},
		defaultVariants: {
			filter: 'ACCEPTED',
		},
	});
	return (
		<motion.div whileTap={whileTab} className={`relative w-full text-white text-3xl font-medium font-handwriting pointer-events-none`}>
			<section className={cn(ButtonVariants({ filter }))}>
				{filter == 'none' || (active && <span className='z-[1] bg-black/50 absolute inset-0 rounded-3xl'></span>)}
				<button className='w-full px-10 py-6 border-4 border-white rounded-3xl pointer-events-auto' onClick={onClickAction}>
					{filter === InvitationStatus.accepted && <span>Accepted</span>}
					{filter === InvitationStatus.pending && <span>Pending</span>}
					{filter === InvitationStatus.declined && <span>Declined</span>}
				</button>
			</section>
			<div className='absolute left-0 top-0 -translate-x-1/4 -translate-y-1/4 z-[1] flex justify-center items-center pointer-events-none'>
				<svg width='155px' height='100px' xmlns='http://www.w3.org/2000/svg' className='font-script text-9xl'>
					<text x='0' y='80%' strokeWidth={5} className={cn(SvgVariants({ filter, active }))}>
						{length > 9 ? '9+' : length}
					</text>
				</svg>
			</div>
		</motion.div>
	);
}
