import React from 'react';
import SideNavBar from './SideNavBar';
import Popover from '../../stories/components/PopOver/AccountsPopover';

export default function Header() {
	return (
		<header className='z-20 pointer-events-none pb-4 w-full fixed bg-red-5 top-0 flex justify-between'>
			<div>
				<SideNavBar />
			</div>
			<div className='ml-auto'>
				<Popover />
			</div>
		</header>
	);
}
