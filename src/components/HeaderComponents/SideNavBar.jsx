import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import HamBurgerButton from '../../stories/components/HamBurgerButton';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const navState = {
	open: {
		x: 0,
		display: 'flex',
		transition: {
			x: { delay: 0, ease: cubicBezier(0.33, 1, 0.68, 1) },
			display: { delay: 0 },
		},
	},
	close: {
		x: '-100%',
		display: 'none',
		transition: {
			x: { delay: 0, ease: cubicBezier(0.33, 1, 0.68, 1) },
			display: { delay: 0.3 },
		},
	},
};

export default function SideNavBar() {
	const event = useSelector((data) => data?.events?.currentEvent);
	const { pathname } = useLocation();
	const params = useParams();
	const navbarRef = useRef(null);
	const [showSideBar, setShowSideBar] = useState(false);
	const [isEventPassed, setIsEventPassed] = useState(true);
	const date = new Date().toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
	useEffect(() => {
		setShowSideBar(false);
	}, [pathname]);
	useEffect(() => {
		const handleNavClick = (e) => {
			if (!navbarRef?.current?.contains(e.target)) {
				setShowSideBar(false);
			}
		};
		window.addEventListener('mousedown', handleNavClick);
		return () => {
			window.removeEventListener('mousedown', handleNavClick);
		};
	}, []);
	useEffect(() => {
		const eventDate = new Date(event?.date);
		const currentDate = new Date();
		if (currentDate >= eventDate || event?.pairingTriggered) {
			setIsEventPassed(false);
		}
	}, [event]);

	return (
		<>
			{event && params?.event && Object.keys(event)?.length > 0 && (
				<div ref={navbarRef} className='relative pointer-events-auto'>
					<div className='z-30 fixed top-8 left-8'>
						<HamBurgerButton isOpen={showSideBar} setIsOpen={setShowSideBar} color={'black'} background={'orange'} />
					</div>
					<AnimatePresence initial={false}>
						{showSideBar && (
							<motion.div
								variants={navState}
								initial={'close'}
								animate={'open'}
								exit={'close'}
								className='bg-supernova z-20 customShadowLarge-Right px-12 pb-12 pt-[163px] fixed h-screen w-full md:w-[460px] flex flex-col justify-between'>
								<nav>
									<ul className='flex flex-col gap-4'>
										<NavLinkItem title={'Dashboard'} to={`/events/${params?.event}`} />
										{isEventPassed && <NavLinkItem title={'Invite'} to={`/events/${params?.event}/invite`} />}
										{isEventPassed && <NavLinkItem title={'Wishlist'} to={`/events/${params?.event}/wishlist`} />}
										<NavLinkItem title={'Our events'} to={`/events/our-events/${event?.ownerId}`} />
										{isEventPassed && <NavLinkItem title={'My wish list'} to={`/events/${params?.event}/wishlist`} />}
									</ul>
								</nav>
								<nav>
									<NavLink
										to={`/events/past-events`}
										className='mb-4 text-5xl font-bold font-condensed text-spanishGreen hover:text-orangeRed transition-colors'>
										Past Events
									</NavLink>
									<p className='text-3xl font-bold font-sans line-clamp-1'>{event?.name}</p>
									<span className='pt-2 font-semibold '>{date}</span>
								</nav>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			)}
		</>
	);
}

function NavLinkItem({ title, to }) {
	return (
		<li className='flex text-6xl font-condensed font-bold hover:text-orangeRed transition-colors'>
			<NavLink className='w-full' to={to}>
				{title}
			</NavLink>
		</li>
	);
}
