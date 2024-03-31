import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const top = {
	open: {
		rotate: 45,
		translateY: 8,
	},
	close: {
		rotate: 0,
		translateY: 0,
	},
};
const center = {
	open: { opacity: 0 },
	close: { opacity: 1 },
};
const bottom = {
	open: {
		rotate: -45,
		translateY: -8,
	},
	close: {
		rotate: 0,
		translateY: 0,
	},
};

export default function HamBurgerButton({ isOpen, setIsOpen, background, color }) {
	const varient = isOpen ? 'open' : 'closed';

	return (
		<motion.button
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0 }}
			onClick={() => setIsOpen((prev) => !prev)}
			className='relative rounded-lg w-8 md:w-12 p-1 md:p-2 flex flex-col items-center justify-evenly aspect-square'
			style={{
				background,
			}}>
			<motion.span
				style={{ background: color }}
				className='absolute w-[70%] top-[0.45rem] md:top-[0.95rem] lg:top-[0.95rem] h-0.5'
				animate={varient}
				variants={top}
			/>
			<motion.span style={{ background: color }} className='absolute w-[70%] h-0.5' animate={varient} variants={center} />
			<motion.span
				style={{ background: color }}
				className='absolute w-[70%] bottom-[0.45rem] md:bottom-[0.95rem] lg:bottom-[0.95rem] h-0.5'
				animate={varient}
				variants={bottom}
			/>
		</motion.button>
	);
}

HamBurgerButton.propTypes = {
	action: PropTypes.func.isRequired,
	background: PropTypes.string,
	color: PropTypes.string,
};
