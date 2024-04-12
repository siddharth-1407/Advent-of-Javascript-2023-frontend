import React from 'react';
import { motion } from 'framer-motion';
import ThemeButton from '../../stories/components/ThemeButton';
import { useSelector } from 'react-redux';

export default function WishlistButton({ setWishlistDrawer }) {
	const event = useSelector((data) => data?.events?.currentEvent);
	return (
		<>
			{event && (
				<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
					<ThemeButton size={'sm'} onClick={() => setWishlistDrawer(true)}>
						Wishlist
					</ThemeButton>
				</motion.div>
			)}
		</>
	);
}
