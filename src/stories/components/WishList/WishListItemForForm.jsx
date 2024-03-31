import React from 'react';
import PropTypes from 'prop-types';
import RoundButton from '../RoundButton';
import { useDispatch } from 'react-redux';
import supabase from '../../../Services/Supabase';
import { removeItem } from '../../../redux/Slices/Wishlist.slice';

export default function WishListItemForForm({ index, data }) {
	const { id, name, url } = data;
	const dispatch = useDispatch();
	async function removeItemFromWishlist(id) {
		try {
			const { error } = await supabase.from('Wishlist').delete().match({
				id: id,
			});
			if (!error) {
				dispatch(removeItem(id));
			}
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className='w-full grid grid-row-2 grid-cols-6 grid-cols gap-2'>
			<div className='col-start-1 col-span-6 py-4 flex items-center bg-white rounded-md'>
				<div className='w-[10%] grid place-items-center'>
					<span className='text-3xl font-handwriting font-bold select-none'>{index + 1}</span>
				</div>
				<div className='flex-1 w-full p-2 text-xl font-semibold'>
					<p>{name}</p>
				</div>
			</div>
			<div className='col-start-1 col-span-1 flex justify-end items-end mb-auto'>
				<span className='w-[5px] h-7 bg-spanishGreen dark:bg-blackPearl rounded-t-full translate-y-[3px]'></span>
				<span className='w-6 h-[5px] bg-spanishGreen dark:bg-blackPearl rounded-r-full translate-y-1/2'></span>
			</div>
			<a
				href={url}
				target='_blank'
				className='py-1 col-start-2 col-span-5 flex items-center rounded-md bg-white hover:text-orangeRed transition-colors'>
				<span htmlFor='wish' className='pl-4 pr-2 uppercase text-md font-bold font-handwriting'>
					url
				</span>
				<div className='w-full p-2 text-xl font-semibold overflow-hidden'>
					<p className='overflow-hidden whitespace-nowrap'>
						<span className=' '>{url}</span>
					</p>
				</div>
			</a>
			<div className='col-start-7 row-start-1 self-center'>
				<RoundButton type='error' onClick={() => removeItemFromWishlist(id)} />
			</div>
		</div>
	);
}
WishListItemForForm.propTypes = {
	index: PropTypes.number,
	data: {
		title: PropTypes.string,
		url: PropTypes.string,
	},
};
