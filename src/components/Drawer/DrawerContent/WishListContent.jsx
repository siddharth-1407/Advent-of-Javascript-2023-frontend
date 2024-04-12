import React, { useState } from 'react';
import Icon from '../../../stories/components/Icon';
import { motion } from 'framer-motion';
import InvitationCard from '../../../stories/components/InvitationCard';
import WishListItem from '../../../stories/components/WishList/WishListItem';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ThemeButton from '../../../stories/components/ThemeButton';
import GreyBoxesSvg from '../../SVGS/GreyBoxesSVG';

export default function WishListContent({ open, setOpen }) {
	const event = useSelector((data) => data?.events?.currentEvent);
	const wishlist = useSelector((data) => data.wishlist.wishes);
	const currentUser = useSelector((data) => data?.user?.userData);
	const IsEventPassed = new Date() >= new Date(event?.date) ? true : false;
	return (
		<section className='md:p-8 pl-0 pt-6 flex flex-col gap-4 h-full'>
			<div className='h-full overflow-hidden'>
				<div className='flex justify-end pr-2'>
					<button onClick={() => setOpen(!open)}>
						<Icon type='close' className='w-12 h-12 aspect-square dark:fill-white' />
					</button>
				</div>
				<div className='h-full flex flex-col gap-4'>
					<div className='flex flex-col sm:flex-row justify-between sm:items-center pl-8 sm:pl-[6.5rem] md:pl-[4.5rem] xl:pl-[13%] pr-2'>
						<strong className='text-7xl sm:text-8xl xl:text-9xl text-white font-semibold font-condensed select-none'>Wish List</strong>
						{wishlist && wishlist.length > 0 && !IsEventPassed && !event?.pairingTriggered && (
							<Link to={'wishlist'}>
								<motion.div
									whileTap={{ scale: 0.9 }}
									className='flex justify-center items-center gap-1 2xl:gap-2 px-6 py-2 md:px-4 md:py-2 xl:px-6 xl:py-2 bg-supernova rounded-full uppercase text-xs xl:text-sm font-semibold'>
									<Icon type='edit' className='w-5 h-5 xl:w-6 xl:h-6 aspect-square' />
									<span>Edit</span>
								</motion.div>
							</Link>
						)}
					</div>
					{Object.keys(currentUser).length > 0 && (
						<div className='pl-8 md:pl-0  pr-4 flex flex-col sm:flex-row justify-end sm:items-center gap-2 sm:gap-8  sm:pr-2'>
							<span className='block xl:pl-8 xl:pr-4 uppercase text-2xl text-white font-bold font-handwriting'>for</span>
							<div className='flex-1 xl:hidden'>
								<InvitationCard
									name={currentUser?.name || ''}
									type={currentUser?.avatar ? 'profile' : 'initial'}
									avatar={currentUser.avatar}
									email={currentUser?.email}

								/>
							</div>
							<div className='flex-1 hidden xl:block '>
								<InvitationCard
									name={currentUser?.name || ''}
									type={currentUser?.avatar ? 'profile' : 'initial'}
									avatar={currentUser.avatar}
									email={currentUser?.email}
								/>
							</div>
						</div>
					)}
					<div className='flex-1 pb-12 px-4 sm:pl-[14%] sm:pr-2 overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-turquoiseGreen dark:scrollbar-thumb-nileBlue'>
						<ul className='divide-y-2 divide-vistaBlue dark:divide-nileBlue h-full pb-4 lg:pb-0'>
							{wishlist && wishlist?.length > 0 ? (
								wishlist?.map((wish, i) => {
									return (
										<li className='py-2 md:py-4' key={wish?.id}>
											<WishListItem index={i + 1} data={wish} />
										</li>
									);
								})
							) : (
								<div className='h-full md:h-full flex flex-col gap-4 justify-center items-center border-6 rounded-3xl border-white/25'>
									<span className='w-56 sm:w-64'>
										<GreyBoxesSvg />
									</span>
									<span className='-translate-y-8 sm:-translate-y-11 text-center text-4xl font-bold text-nileBlue'>
										No items in wishlist!
									</span>
									<div className='-translate-y-8'>
										<ThemeButton
											size={'sm'}
											link
											to={`wishlist`}
											className=' relative px-6 pt-3 pb-2 rounded-full text-lg text-white bg-nileBlue font-medium'>
											Create your wishlist
										</ThemeButton>
									</div>
								</div>
							)}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
