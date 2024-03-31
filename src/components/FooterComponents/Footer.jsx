import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../stories/components/Logo';

export default function Footer() {
	const year = new Date().getFullYear();
	return (
		<div className='py-14 md:py-16 lg:py-20 sticky bottom-0 bg-acadia dark:bg-blackPearl px-4'>
			<div className='flex flex-col justify-center items-center gap-16 relative'>
				<div>
					<Logo />
					<Logo theme='dark' />
				</div>
				<div className='flex flex-col items-center gap-2 text-scotchMist text-xs md:text-sm lg:text-base'>
					<p className='text-center'>
						CopyRight &copy; {year}.
						<a href='/#' className='underline px-1'>
							Ah Ha Creative, LLC.
						</a>
						All Rights Reserved.
					</p>
					<ul className='flex gap-4 '>
						<li className='underline relative after:absolute after:content-["&middot;"] after:-right-2 after:translate-x-1/2'>
							<Link to={'/#'}>Terms & Conditions</Link>
						</li>
						<li className='underline relative after:absolute after:content-["&middot;"] after:-right-2 after:translate-x-1/2'>
							<Link to={'/#'}>Privacy Policy</Link>
						</li>
						<li className='underline relative'>
							<Link to={'/#'}>Disclaimers</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
