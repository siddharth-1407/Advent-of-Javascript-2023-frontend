import React, { useEffect, useState } from 'react';
import InteriorLayout from '../../components/layouts/Interior/InteriorLayout';
import DrawerWrapper from '../../components/Drawer/DrawerWrapper/DrawerWrapper';
import WishListContent from '../../components/Drawer/DrawerContent/WishListContent';
import Accordion from '../../stories/components/Accordion/Accordion';
import FilterButtons from '../../stories/components/FilterButtons';
import { ThankyouMessageForm } from '../../components/Forms';
import InvitationCard from '../../stories/components/InvitationCard';
import ThemeSwitcher from '../../stories/components/ThemeSwitcher';
import MyAccountContent from '../../components/Drawer/DrawerContent/MyAccountContent';

export default function Test() {
	const [model, setModel] = useState(false);
	useEffect(() => {
		if (model) {
			document.documentElement.classList.add('overflow-hidden');
		} else {
			document.documentElement.classList.remove('overflow-hidden');
		}
	}, [model]);

	return (
		<InteriorLayout>
			<button onClick={() => setModel(!model)}>click me</button>
			{/* <div className=''>
				<div className='flex gap-16 pt-9'>
					<FilterButtons filter={'accept'} length={1} />
					<FilterButtons filter={'pending'} length={2} />
					<FilterButtons filter={'decline'} length={3} />
				</div>
			</div> */}
			{/* <div className='md:pl-8 w-full md:max-w-3xl 2xl:max-w-5xl flex flex-col gap-4'>
				<p className='text-6xl md:text-8xl 2xl:text-9xl text-white font-bold font-condensed'>Thank you</p>
				<div className='flex items-center gap-8 md:gap-12'>
					<span className='text-2xl md:pl-4 uppercase text-white font-handwriting'>to</span>
					<InvitationCard avatar={'./avatars/placeholder_avatar-03.png'} name='Floyd Miles' email={'floyd.miles.example.com'} />
				</div>
				<ThemeSwitcher />
				<ThankyouMessageForm />
			</div> */}

			<DrawerWrapper open={model} setOpen={setModel}>
				{/* <WishListContent open={model} setOpen={setModel} /> */}
				<MyAccountContent open={model} setOpen={setModel} />
			</DrawerWrapper>
		</InteriorLayout>
	);
}
