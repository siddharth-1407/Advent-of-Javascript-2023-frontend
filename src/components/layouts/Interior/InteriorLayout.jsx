import React from 'react';
import Footer from '../../FooterComponents/Footer';
import { Link } from 'react-router-dom';

export default function InteriorLayout({ children }) {
	return (
		<>
			<main className='z-10 sticky bottom-0 px-4 pt-20 pb-8 sm:pt-28 lg:pt-36 min-h-screen flex lg:bg-interior bg-[length:460px_auto] 2xl:bg-[length:510px_auto] bg-silverTree dark:bg-nileBlue bg-no-repeat'>
				<aside className='w-fit hidden lg:flex items-start '>
					<Link to={'/'}>
						<img
							src='/overlays/logo__secret-santa.svg'
							alt='logo'
							className='min-w-[300px] w-[40%] max-w-xs md:max-w-sm 2xl:max-w-lg 2xl:pt-0 2xl:ml-6 pointer-events-none'
						/>
					</Link>
				</aside>
				<section className='flex-1 w-full 2xl:w-[60%] sm:px-5 2xl:px-4'>{children}</section>
			</main>
			<Footer />
		</>
	);
}
