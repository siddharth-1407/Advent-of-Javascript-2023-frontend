import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';

const DrawerWrapperAnime = {
	show: {
		right: '0%',
		display: 'block',
		transition: {
			right: { ease: cubicBezier(0.25, 1, 0.5, 1) },
		},
	},
	hide: {
		right: '-100%',
		display: 'none',
		transition: {
			right: { ease: cubicBezier(0.25, 1, 0.5, 1) },
			display: {
				delay: 0.3,
			},
		},
	},
};
export default function DrawerWrapper({ children, open, setOpen }) {
	const DrawerRef = useRef(null);
	useEffect(() => {
		const handleCloseOnClick = (e) => {
			if (!DrawerRef.current?.contains(e.target)) {
				setOpen(false);
			}
		};
		window.addEventListener('mousedown', handleCloseOnClick);
		return () => window.removeEventListener('mousedown', handleCloseOnClick);
	}, []);
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='w-full h-screen absolute top-0 left-0 bg-black/50 z-50'>
					<motion.section
						ref={DrawerRef}
						variants={DrawerWrapperAnime}
						initial={'hide'}
						animate={'show'}
						exit={'hide'}
						className='customShadowLarge-Left z-40 fixed top-0 right-0 h-screen w-full md:max-w-xl lg:w-full xl:max-w-[950px] bg-spanishGreen dark:bg-blackPearl'>
						{children}
					</motion.section>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
