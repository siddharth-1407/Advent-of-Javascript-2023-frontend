import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import cn from '../../Utils/Cn';
import { Link } from 'react-router-dom';

const ButtonVarients = cva('block bg-supernova font-handwriting rounded-full uppercase hover:drop-shadow-md transition-shadow text-center', {
	variants: {
		size: {
			sm: 'text-xs px-4 py-2 sm:px-5 sm:py-2 2xl:px-6 2xl:py-2 2xl:text-sm',
			lg: 'pt-3 pb-2 text-2xl md:text-3xl ',
		},
	},
	defaultVariants: {
		size: 'lg',
		link: false,
	},
});

export default function ThemeButton({ children, size, onClick, form = false, link = false, target = '_self', to, className }) {
	return (
		<>
			{link ? (
				<motion.div whileTap={{ scale: 0.9 }}>
					<Link to={to} target={target} className={cn(ButtonVarients({ className, size }))}>
						{children}
					</Link>
				</motion.div>
			) : (
				<motion.button
					type={form ? 'submit' : 'button'}
					onClick={onClick}
					whileTap={{ scale: 0.9 }}
					className={cn(ButtonVarients({ className, size }))}>
					{children}
				</motion.button>
			)}
		</>
	);
}
ThemeButton.propTypes = {
	children: PropTypes.node,
	size: PropTypes.oneOf(['sm', 'lg']),
	form: PropTypes.bool,
	link: PropTypes.bool,
	to: PropTypes.string,
	target: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string,
};
