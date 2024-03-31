import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import PopoverTrigger from './PopoverTrigger';
import PopoverContent from './PopoverContent';
import Icon from '../Icon';
import Avatar from '../Avatar';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Signout } from '../../../Utils/Supabase';
import { setUser } from '../../../redux/Slices/User.slice';
import { handleAccount } from '../../../redux/Slices/Drawers.slice';

export default function AccountsPopover() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const popoverRef = useRef(null);
	const [popover, setPopover] = useState(false);
	const user = useSelector((data) => data?.user?.userData);
	const handlePopOver = () => {
		setPopover((prev) => !prev);
	};
	async function handleLogout() {
		const data = await Signout();
		if (data.success) {
			dispatch(setUser({}));
			navigate('/login');
		}
	}

	const PopOverOptions = [
		{
			id: 1,
			type: 'button',
			icon: 'user',
			title: 'my account',
			action: () => dispatch(handleAccount(true)),
		},
		{
			id: 2,
			type: 'link',
			icon: 'calender',
			title: 'my events',
			path: '/my-events',
		},
		{
			id: 3,
			type: 'button',
			icon: 'logout',
			title: 'logout',
			action: handleLogout,
		},
	];
	useEffect(() => {
		const handleProfileClick = (e) => {
			if (!popoverRef.current.contains(e.target)) {
				setPopover(false);
			}
		};
		window.addEventListener('mousedown', handleProfileClick);
		return () => {
			window.removeEventListener('mousedown', handleProfileClick);
		};
	}, []);
	return (
		<AnimatePresence>
			{Object.keys(user).length > 0 && (
				<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='relative pointer-events-auto mt-8 mr-8' ref={popoverRef}>
					<PopoverTrigger handlePopOver={handlePopOver}>
						<div className='lg:w-64 2xl:w-72 flex gap-3 items-center rounded-lg lg:backdrop-blur-lg lg:bg-black/70 lg:dark:bg-black/60 lg:px-4 lg:py-2 overflow-hidden'>
							<Icon color='black' type='chevron' className='hidden lg:block fill-white' />
							<div className='flex gap-3 text-white'>
								<div className='sm:hidden'>
									<Avatar name={user?.name || 'user'} size='sm' src={user?.avatar} type={user?.avatar ? 'profile' : 'initial'} />
								</div>
								<div className='hidden sm:block 2xl:hidden'>
									<Avatar name={user?.name || 'user'} size='md' src={user?.avatar} type={user?.avatar ? 'profile' : 'initial'} />
								</div>
								<div className='hidden 2xl:block'>
									<Avatar name={user?.name || 'user'} size='lg' src={user?.avatar} type={user?.avatar ? 'profile' : 'initial'} />
								</div>
								<div className='hidden lg:flex flex-col justify-center gap-1'>
									<span className='text-start'>Logged in as</span>
									<strong className='text-xl line-clamp-1 text-start'>{user?.name || 'user'}</strong>
								</div>
							</div>
						</div>
					</PopoverTrigger>
					<PopoverContent popover={popover}>
						<div
							className='pl-6 pr-8 py-8 border-2 border-supernova rounded-md bg-white  
                               relative top-2 lg:right-6 2xl:right-4
                             before:bg-white
                               before:absolute 
                               before:w-4 
                               before:aspect-square 
                               before:border-2 before:border-l-supernova before:border-t-supernova before:border-transparent
                               before:top-0 before:rotate-45
                               before:right-8
                               sm:before:right-11
                               lg:before:left-14
                               2xl:before:left-11
                               before:-translate-y-1/2 '>
							<ul className='flex flex-col gap-4'>
								{PopOverOptions?.map((item) => {
									return (
										<React.Fragment key={item.id}>
											<ListItem item={item} />
										</React.Fragment>
									);
								})}
							</ul>
						</div>
					</PopoverContent>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
function ListItem({ item }) {
	const { icon, title, path, type, action } = item;
	return (
		<>
			{type === 'link' ? (
				<li className='flex'>
					<Link to={path} className='group w-full flex gap-4 hover:text-orangeRed transition-colors'>
						<Icon type={icon} size={35} className='fill-pastelMagenta group-hover:fill-orangeRed transition-colors' />
						<span className='text-4xl uppercase whitespace-nowrap font-medium font-condensed'>{title}</span>
					</Link>
				</li>
			) : (
				<li className='flex '>
					<button onClick={action} className='group w-full flex gap-4 hover:text-orangeRed transition-colors'>
						<Icon type={icon} size={35} className='fill-pastelMagenta group-hover:fill-orangeRed transition-colors' />
						<span className='text-4xl uppercase whitespace-nowrap font-medium font-condensed'>{title}</span>
					</button>
				</li>
			)}
		</>
	);
}
ListItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.number,
		icon: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['link', 'button']).isRequired,
		path: function (props, propName) {
			if (props.type === 'link' && !props[propName]) {
				throw new Error(`When "${propName}" prop is set to "link", then "path" prop is required`);
			}
			PropTypes.string;
		},
		action: function (props, propName) {
			if (props.type == 'button' && !props[propName]) {
				throw new Error(`When "${propName}" prop is set to "button", then "action" prop is required`);
			}
			PropTypes.func;
		},
	}).isRequired,
};
