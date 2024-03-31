import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InvitesList from './Lists/InvitesList';
import FilterButtons from '../stories/components/FilterButtons';
import { InvitationStatus } from '../Utils';
import GenericLoader from '../stories/components/Loaders/SnowFlakeLoader';
import ModelWrapper from '../stories/components/Models/Wrappers/ModelWrapper';
import RemoveCardModelContent from '../stories/components/Models/Contents/RemoveCardModelContent';

export default function FilterInvitesComponent() {
	const model = useSelector((data) => data?.model?.isModelOpen);
	const invites = useSelector((data) => data?.invites?.invitees);
	const invitesLoading = useSelector((data) => data?.invites?.loading);
	const eventLoading = useSelector((data) => data?.events?.loading);
	const [currentFilter, setCurrentFilter] = useState(null);
	const [filteredInvites, setFilteredInvites] = useState(invites);
	const filterInvites = (filter) => {
		if (currentFilter === filter) {
			setFilteredInvites(invites);
			setCurrentFilter(null);
		} else {
			setFilteredInvites(invites.filter((invite) => invite.status == filter));
			setCurrentFilter(filter);
		}
	};
	useEffect(() => {
		setFilteredInvites(invites);
	}, [invites]);
	return (
		<>
			{eventLoading || invitesLoading ? (
				
					<GenericLoader />
				
			) : (
				<>
					<section className='flex gap-24 py-12'>
						<FilterButtons
							onClickAction={() => filterInvites(InvitationStatus.declined)}
							active={currentFilter && currentFilter !== InvitationStatus.declined}
							filter={InvitationStatus.declined}
							length={invites.filter((item) => item.status == InvitationStatus.declined).length}
						/>
						<FilterButtons
							onClickAction={() => filterInvites(InvitationStatus.pending)}
							active={currentFilter && currentFilter !== InvitationStatus.pending}
							filter={InvitationStatus.pending}
							length={invites.filter((item) => item.status == InvitationStatus.pending).length}
						/>
						<FilterButtons
							onClickAction={() => filterInvites(InvitationStatus.accepted)}
							active={currentFilter && currentFilter !== InvitationStatus.accepted}
							filter={InvitationStatus.accepted}
							length={invites.filter((item) => item.status == InvitationStatus.accepted).length}
						/>
					</section>
					<InvitesList invitees={filteredInvites} />
					<ModelWrapper isModelVisible={model}>
						<RemoveCardModelContent />
					</ModelWrapper>
				</>
			)}
		</>
	);
}
