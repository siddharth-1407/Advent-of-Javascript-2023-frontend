import React from 'react';
import { motion } from 'framer-motion';
import WishListItemForForm from './WishListItemForForm';
import { useSelector } from 'react-redux';

export default function WishListForForm() {
	const wishlist = useSelector((data) => data?.wishlist?.wishes);
	const loading = useSelector((data) => data?.wishlist?.loading);

	return (
		<motion.ul className='w-full flex flex-col gap-4'>
			{/* render skeleton loading */}
			{loading && 'loading...'}
			{wishlist &&
				wishlist.length > 0 &&
				wishlist?.map((item, i) => {
					const { siteImage, siteDescription, ...rest } = item;
					return (
						<motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={item.id}>
							<WishListItemForForm index={i} data={{ ...rest }} />
						</motion.li>
					);
				})}
		</motion.ul>
	);
}
