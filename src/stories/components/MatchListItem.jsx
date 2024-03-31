import React from 'react';
import InvitationCard from './InvitationCard';
import { easeOut, motion } from 'framer-motion';
import { useSelector } from 'react-redux';

export default function MatchListItem({ data, index }) {
	const event = useSelector((data) => data?.events?.currentEvent);
	const currentUserId = useSelector((data) => data?.user?.userData);
	const santaVarient = {
		show: (i) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: i * 0.15,
				ease: easeOut,
			},
		}),
		hide: {
			opacity: 0,
			x: -30,
		},
	};
	const receiverVarient = {
		show: (i) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: i * 0.15,
				ease: easeOut,
			},
		}),
		hide: {
			opacity: 0,
			x: 30,
		},
	};

	const santa = data?.santaProfile;
	const receiver = data?.personProfile;
	const eventDate = new Date(event?.date);
	const currentDate = new Date();
	const isUserAnon = eventDate < currentDate ? false : santa?.id !== currentUserId?.id ? true : false;
	return (
		<div className='flex flex-col md:flex-row items-center gap-2'>
			<div className='flex-1 w-full'>
				<motion.div variants={santaVarient} initial={'hide'} animate={'show'} exit={'hide'} custom={index} className='flex-1 w-full pl-5'>
					<InvitationCard avatar={santa.avatar} name={santa.name} email={santa.email} isSanta />
				</motion.div>
			</div>
			<motion.span
				initial={{ scaleY: 0 }}
				animate={{ scaleY: 1, transition: { ease: easeOut, scaleY: { delay: index * 0.18 } } }}
				exit={{ scaleY: 0 }}
				className='md:hidden w-1 h-8 origin-top bg-supernova'></motion.span>
			<motion.span
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1, transition: { ease: easeOut, scaleX: { delay: index * 0.18 } } }}
				exit={{ scaleY: 0 }}
				className='hidden md:block min-w-16 max-w-16 sm:w-20 sm:h-1.5 origin-left bg-supernova'></motion.span>
			<div className='flex-1 w-full'>
				<motion.div variants={receiverVarient} initial={'hide'} animate={'show'} exit={'hide'} custom={index} className='flex-1 w-full pl-5'>
					<InvitationCard
						avatar={isUserAnon ? 'undefined' : receiver?.avatar}
						name={isUserAnon ? 'undefined' : receiver?.name}
						email={isUserAnon ? 'undefined' : receiver?.email}
						anonymous={isUserAnon}
					/>
				</motion.div>
			</div>
		</div>
	);
}
