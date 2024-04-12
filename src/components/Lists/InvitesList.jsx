import { useDispatch, useSelector } from 'react-redux';
import InvitationCard from '../../stories/components/InvitationCard';
import { useEffect, useState } from 'react';
import { ModelType, handleModel } from '../../redux/Slices/Model.slice';
import { setCurrentSelected } from '../../redux/Slices/InviteList.slice';
import { easeOut, motion } from 'framer-motion';

export default function InvitesList({ invitees }) {
	const dispatch = useDispatch();
	const event = useSelector((data) => data?.events?.currentEvent);
	const CurrentUserId = useSelector((data) => data?.user?.userData?.id);
	const [isAdmin, setIsAdmin] = useState(false);
	useEffect(() => {
		setIsAdmin(event?.ownerId === CurrentUserId);
	}, [event]);

	const handleRemoveUser = (user) => {
		dispatch(setCurrentSelected(user));
		dispatch(handleModel({ type: ModelType.deleteInvite, value: true }));
	};
	return (
		<motion.ul
			className='grid grid-flow-row justify-start items-start place-content-start grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-6 py-8'
			layout>
			{invitees &&
				invitees.length > 0 &&
				invitees.map((item) => {
					return (
						<motion.li
							initial={{ scale: 0 }}
							key={item.id}
							layout
							animate={{ scale: 1, transition: { delay: 0.3, ease: easeOut } }}
							exit={{ scale: 0 }}>
							<InvitationCard
								name={item.name}
								avatar={item.avatar}
								type={item.avatar ? 'profile' : 'initial'}
								email={item.email}
								isCloseShowing={isAdmin}
								handleClose={() => handleRemoveUser(item)}
								status={item.status}
							/>
						</motion.li>
					);
				})}
		</motion.ul>
	);
}
