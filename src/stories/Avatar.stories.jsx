import Avatar from './components/Avatar';

export default {
	title: 'Avatar',
	component: Avatar,
	tags: ['autodocs'],
};

const Template = (args) => <Avatar {...args} />;

export const ProfileUser = Template.bind({});
ProfileUser.args = {
	name: 'Linda',
	src: './avatars/placeholder_avatar-01.png',
	type: 'profile',
	status: 'accepted',
	size: 'lg',
	santaHat: false,
};

export const InitialUser = Template.bind({});
InitialUser.args = {
	name: 'Siddhart',
	src: './avatars/placeholder_avatar-01.png',
	type: 'initial',
	status: 'accepted',
	size: 'md',
	santaHat: false,
};
export const IconUser = Template.bind({});
IconUser.args = {
	name: 'Siddhart',
	src: './avatars/placeholder_avatar-01.png',
	type: 'anonymous',
	status: 'accepted',
	size: 'md',
	santaHat: false,
};
