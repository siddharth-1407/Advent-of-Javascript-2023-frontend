import React from 'react';

export default function AuthTitle({ title }) {
	return (
		<div className='mx-auto'>
			<h1
				className='text-6xl sm:text-7xl text-white font-condensed whitespace-nowrap relative 
                           before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[5rem] before:h-0.5 before:bg-white
                           after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-[5rem] after:h-0.5 after:bg-white
                           before:w-14 after:w-14 md:before:w-16 md:after:w-16'>
				{title}
			</h1>
		</div>
	);
}
