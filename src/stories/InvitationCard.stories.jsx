import InvitationCard from './components/InvitationCard';

export default {
	title: 'InvitationCard',
	component: InvitationCard,
	tags: ['autodocs'],
};

const Template = (args) => <InvitationCard {...args} />;

export const InvitationCard1 = Template.bind({});
InvitationCard1.args = {
	name: 'Wade Warren',
	avatar: './avatars/placeholder_avatar-03.png',
	email: 'wade.warren@example.com',
	status: 'green',
	isSanta: true,
	isCloseShowing: true,
};

export const InvitationCard2 = Template.bind({});
InvitationCard2.args = {
	name: 'Courtney Henry',
	avatar: './avatars/placeholder_avatar-04.png',
	email: 'courtney.henry@example.com',
	status: 'yellow',
	isSanta: false,
	isCloseShowing: false,
};

export const InvitationCard3 = Template.bind({});
InvitationCard3.args = {
	name: 'Marvin McKinney',
	avatar: './avatars/placeholder_avatar-05.png',
	email: 'marvin.mckinney@example.com',
	status: 'red',
	isSanta: false,
	isCloseShowing: true,
};
