import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Icon from '../../stories/components/Icon';
import { cva } from 'class-variance-authority';
import  cn  from '../../Utils/Cn';

export default function RoundButton({ type, onClick, form = false }) {
	const ButtonVarients = cva('w-16 p2 aspect-square rounded-full grid place-items-center border-2', {
		variants: {
			type: {
				success: 'bg-spanishGreen',
				warning: 'bg-supernova',
				error: 'bg-fireEngineRed',
			},
		},
		defaultVariants: {
			type: 'success',
		},
	});
	const IconVarients = cva('', {
		variants: {
			type: {
				success: 'fill-white',
				warning: 'fill-black',
				error: 'fill-white rotate-45',
			},
		},
		defaultVariants: {
			type: 'success',
		},
	});

	return (
		<motion.button
			type={form ? 'submit' : 'button'}
			onClick={onClick}
			whileHover={{ rotate: type !== 'error' ? '90deg' : '0deg' }}
			whileTap={{ scale: 0.9 }}
			className={cn(ButtonVarients({ type }))}>
			<Icon type='plus' className={cn(IconVarients({ type }))} />
		</motion.button>
	);
}
RoundButton.propTypes = {
	type: PropTypes.oneOf(['success', 'warning', 'error']).isRequired,
	onClick: PropTypes.func,
};
