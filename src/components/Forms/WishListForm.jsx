import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import RoundButton from '../../stories/components/RoundButton';
import supabase from '../../Services/Supabase';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/Slices/Wishlist.slice';

export default function WishListForm({ index }) {
	const dispatch = useDispatch();
	const event = useSelector((data) => data?.events?.currentEvent);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	async function add_Item_To_Wishlist(data) {
		const { wish, url } = data;
		try {
			const { data, error } = await supabase
				.from('Wishlist')
				.insert({
					name: wish,
					url: url,
					userId: JSON.parse(localStorage.getItem('user')).id,
					eventId: event?.id,
				})
				.select('id, name, url, siteDescription, siteImage');
			if (!error) {
				dispatch(addItem(data));
				reset();
			}
		} catch (error) {
			console.log('Error', error);
		}
	}
	return (
		<form onSubmit={handleSubmit(add_Item_To_Wishlist)} className='w-full grid grid-row-2 grid-cols-6 grid-cols gap-2'>
			<section className='col-start-1 col-span-6 flex flex-col'>
				<div className='bg-white rounded-md flex overflow-hidden'>
					<div className='w-[10%] grid place-items-center'>
						<span className='text-3xl font-handwriting font-bold'>{index}</span>
					</div>
					<div className='flex-1'>
						<label htmlFor='wish' className='sr-only'>
							wish
						</label>
						<input
							id='wish'
							name='wish'
							type='text'
							defaultValue={''}
							{...register('wish', { required: true })}
							aria-invalid={errors.wish ? 'true' : 'false'}
							className='w-full py-6 px-3 text-2xl font-semibold outline-none'
						/>
					</div>
				</div>
				<div className='px-16 text-medium dark:text-white'>
					{errors.wish?.type === 'required' && <span role='alert'>This field is required</span>}
				</div>
			</section>
			<div className='col-start-1 col-span-1 flex justify-end items-end mb-auto'>
				<span className='w-[5px] h-7 bg-spanishGreen dark:bg-blackPearl rounded-t-full translate-y-[3px]'></span>
				<span className='w-6 h-[5px] bg-spanishGreen dark:bg-blackPearl rounded-r-full translate-y-1/2'></span>
			</div>
			<section className='col-start-2 col-span-5 '>
				<div className='py-1 flex items-center bg-white rounded-md overflow-hidden'>
					<label htmlFor='wish' className='pl-4 pr-2 text-xl font-bold font-handwriting'>
						url
					</label>
					<input
						id='wish'
						name='wish'
						type='text'
						defaultValue={''}
						{...register('url', {
							required: true,
							pattern:
								/^(https?:\/\/(?:[a-z]\.))?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
						})}
						className='w-full p-2 text-xl font-semibold outline-none'
					/>
				</div>
				<div className='px-4 text-medium dark:text-white'>
					{errors.url?.type === 'required' && <span>URL is required!</span>}
					{errors.url?.type === 'pattern' && <span>Invalid url pattern.</span>}
				</div>
			</section>
			<div className='col-start-7 row-start-1 self-center'>
				<RoundButton type='success' form />
			</div>
		</form>
	);
}
WishListForm.propTypes = {
	index: PropTypes.number,
};
