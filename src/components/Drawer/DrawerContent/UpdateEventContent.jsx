import React from 'react';
import Icon from '../../../stories/components/Icon';
import { UpdateEventForm } from '../../Forms';
import DeleteEventButton from '../../DeleteEventButton';

export default function UpdateEventContent({ setOpen, open }) {
	return (
		<div className='md:p-8 pl-0 pt-6 flex flex-col gap-4 h-full'>
			<div className='h-full overflow-hidden'>
				<div className='flex justify-end pr-2'>
					<button onClick={() => setOpen(!open)}>
						<Icon type='close' className='w-12 h-12 aspect-square dark:fill-white' />
					</button>
				</div>
				<div className='h-full flex flex-col gap-4 mt-4 md:mt-0'>
					<div className='flex flex-col pl-4 sm:pl-20 md:pl-[4.5rem] xl:pl-[13%] pr-2 text-white'>
						<strong className='text-7xl sm:text-8xl xl:text-9xl  font-semibold font-condensed select-none'>Event Details</strong>
						<p className='text-4xl font-handwriting'>Edit the current Event</p>
					</div>
					<div className='flex flex-col gap-6 px-4 sm:pl-20 sm:pr-4 xl:pl-28 md:pt-6 xl:pt-8'>
						<UpdateEventForm setOpen={setOpen} open={open} />
						<div className='self-center'>
							<DeleteEventButton />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
