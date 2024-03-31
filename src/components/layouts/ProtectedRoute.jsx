import React, { useEffect } from 'react';
import supabase from '../../Services/Supabase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/Slices/User.slice';
import Header from '../HeaderComponents/Header';
import DrawerWrapper from '../Drawer/DrawerWrapper/DrawerWrapper';
import { handleAccount } from '../../redux/Slices/Drawers.slice';
import MyAccountContent from '../Drawer/DrawerContent/MyAccountContent';
import { getAvatarUrl } from '../../Utils/Supabase';

export default function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const accountsDrawer = useSelector((data) => data?.drawers?.accounts);

	async function SetUserToRedux() {
		const { data, error } = await supabase.auth.getUser();
		if (error) {
			console.error('Error encountered while getting user : ', user.error);
		}
		if (!data?.user) {
			navigate('/login');
		} else {
			const avatarUrl = await getAvatarUrl(data?.user?.id);
			const user = {
				id: data?.user?.id,
				name: data?.user?.user_metadata?.display_name,
				email: data?.user?.email,
				avatar: avatarUrl?.publicUrl,
			};
			dispatch(setUser(user));
		}
	}

	async function getSession() {
		const {
			data: { session },
		} = await supabase.auth.getSession();
		if (!session) {
			navigate('/login');
		} else {
			SetUserToRedux();
		}
	}

	useEffect(() => {
		getSession();
	}, []);

	return (
		<>
			<Header />
			{children}
			<DrawerWrapper open={accountsDrawer} setOpen={(value) => dispatch(handleAccount(value))}>
				<MyAccountContent open={accountsDrawer} setOpen={(value) => dispatch(handleAccount(value))} />
			</DrawerWrapper>
		</>
	);
}
