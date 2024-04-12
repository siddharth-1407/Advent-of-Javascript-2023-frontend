import React from 'react';
import PropTypes from 'prop-types';

export default function WishListItem({ index, data }) {
	return (
		<div className='flex flex-col gap-3'>
			<div className='flex w-full gap-4'>
				<p className='text-white font-medium text-2xl min-w-3 md:min-w-6'>
					<span className='font-bold font-handwriting'>{index}</span>
					{data.title}
				</p>

				<div className='flex-1 flex justify-between text-white'>
					<div className='w-full border border-vistaBlue dark:border-nileBlue '>
						<a href={`http://${data.url}`} target='_blank' className={'group'}>
							<div className='flex flex-col gap-2 p-3 md:p-4'>
								<strong className='text-2xl line-clamp-2 leading-7 group-hover:text-orangeRed w-fit'>{data.name}</strong>
								<p className='uppercase text-xs line-clamp-1'>{data?.url?.substring(0, 100)}</p>
								<p className='text-sm line-clamp-3'>{data.description}</p>
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
