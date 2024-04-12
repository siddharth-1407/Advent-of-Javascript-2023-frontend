import React, { useEffect } from 'react';
import InteriorLayout from '../../components/layouts/Interior/InteriorLayout';
import { WishListForm } from '../../components/Forms';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getEvent } from '../../redux/Slices/Event.slice';
import WishListForForm from '../../stories/components/WishList/WishListForForm';
import { getWishlist } from '../../redux/Slices/Wishlist.slice';
import { Helmet } from 'react-helmet';

export default function Create_And_Edit_Wishlist() {
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const event = useSelector((data) => data?.events?.currentEvent);
	const eventError = useSelector((data) => data?.events?.error);
	const wishlist = useSelector((data) => data?.wishlist?.wishes);
	const wishlistError = useSelector((data) => data?.wishlist?.error);
	useEffect(() => {
		const eventName = params.event.replace(/\-/g, ' ');
		if (!event || eventName !== event?.name) {
			dispatch(getEvent(eventName));
		}
	}, []);
	useEffect(() => {
		if (!event && eventError) {
			eventError.status === 404 ? navigate('/not-found') : navigate('/server-error');
		}
		const eventDate = new Date(event?.date);
		const currentDate = new Date();
		if (eventDate <= currentDate || event?.pairingTriggered) {
			navigate(`/events/${params.event}`);
		}

		if (event && event.name === params.event.replace(/\-/g, ' ') && wishlist.length < 1) {
			const eventId = event.id;
			const userId = event.ownerId;
			dispatch(getWishlist({ userId, eventId }));
		}
	}, [event]);
	return (
		<InteriorLayout>
			<Helmet>
				<title>{`Wishlist - ${event.name} | Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, ${event.name}, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Wishlist - ${event.name} | Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Wishlist - ${event.name} | Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<section className='pt-8 2xl:pl-48 2xl:pr-2'>
				<div className='flex justify-between items-center'>
					<div className='text-white flex flex-col gap-1 select-none'>
						<p className='text-7xl 2xl:text-9xl font-bold font-condensed'>Wish list</p>
						<p className='text-xl 2xl:text-4xl font-bold font-handwriting'>Make your list and check it twice</p>
					</div>
				</div>
				<div className='mt-6 flex flex-col gap-4'>
					<WishListForForm wishlist={wishlist} error={wishlistError} />
					<WishListForm index={wishlist.length + 1 || 1} />
				</div>
			</section>
		</InteriorLayout>
	);
}
