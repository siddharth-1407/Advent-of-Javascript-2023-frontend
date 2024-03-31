import React from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

export default function PopoverContent({ children, popover }) {
	const popoverAnime = {
		show: {
			opacity: 1,
		},
		hide: {
			opacity: 0,
		},
	};
	const animate = popover ? 'show' : 'hide';

	return (
		<AnimatePresence initial={false}>
			{popover && (
				<motion.div className='absolute -right-6 lg:-right-6 2xl:-right-4' variants={popoverAnime} initial={'hide'} animate={animate} exit={'hide'}>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
PopoverContent.propTypes = {
	children: PropTypes.node,
	popover: PropTypes.bool,
};
