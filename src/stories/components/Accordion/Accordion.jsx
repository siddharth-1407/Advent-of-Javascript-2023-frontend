import React, { useState } from 'react';
import { AnimatePresence, easeOut, motion } from 'framer-motion';
import Icon from '../Icon';
import PropTypes from 'prop-types';

const IconVarient = {
	open: {
		rotate: 180,
		transition: {
			duration: 0.2,
			ease: easeOut,
		},
	},
	close: {
		rotate: 0,
		transition: {
			duration: 0.2,
			ease: easeOut,
		},
	},
};
const AccordionVarient = {
	open: {
		height: 'auto',
		display: 'block',
		transition: {
			height: {
				duration: 0.2,
			},
		},
	},
	close: {
		height: 0,
		display: 'none',
		transition: {
			height: {
				duration: 0.2,
			},
			display: {
				delay: 0.2,
			},
		},
	},
};

export default function Accordion({ children, title }) {
	const [isAccordionOpen, setIsAccordionOpen] = useState(false);

	return (
		<section className='w-full py-2 flex flex-col'>
			<button
				className='py-2 flex items-center gap-3 w-full uppercase text-white sm:text-lg font-medium font-handwriting'
				onClick={() => setIsAccordionOpen(!isAccordionOpen)}>
				<span className='text-start'>{title}</span>
				<span className='flex-1 h-0.5 bg-white'></span>
				<motion.span variants={IconVarient} initial={'close'} animate={isAccordionOpen ? 'open' : 'close'}>
					<Icon type='chevron' className='fill-white w-5 h-5 sm:w-6 sm:h-6' />
				</motion.span>
			</button>
			<AnimatePresence>
				{isAccordionOpen && (
					<motion.div
						variants={AccordionVarient}
						initial={'close'}
						animate={'open'}
						exit={'close'}
						className='origin-top h-fit overflow-hidden'>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}

Accordion.propTypes = {
	children: PropTypes.node,
	title: PropTypes.section,
};
