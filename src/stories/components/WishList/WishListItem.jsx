import React from 'react';
import PropTypes from 'prop-types';

export default function WishListItem({ index, data }) {
	return (
		<div className='flex flex-col gap-3'>
			<div className='flex'>
				<p className='text-white font-medium text-2xl'>
					<span className='font-bold font-handwriting pr-6'>{index}</span>
					{data.title}
				</p>
				<div className='w-full pl-7 flex justify-between text-white'>
					<div className='w-full flex border border-vistaBlue dark:border-nileBlue '>
						<a href={`http://${data.url}`} target='_blank' className={'group w-full'}>
							<div className=' flex flex-col gap-2 p-3 md:p-4 '>
								<strong className='text-2xl line-clamp-2 leading-7 group-hover:text-orangeRed'>{data.name}</strong>
								<span className='uppercase text-xs line-clamp-1'>{data.url}</span>
								<span className='text-sm line-clamp-3'>{data.description}</span>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

WishListItem.propTypes = {
	index: PropTypes.number,
	data: PropTypes.shape({
		productName: PropTypes.string,
		url: PropTypes.string,
		description: PropTypes.string,
	}),
};
