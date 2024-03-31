import InvitationReqBtn from './components/InvitationReqButtons/InvitationReqBtn';

export default {
	title: 'InvitationReqBtn',
	component: InvitationReqBtn,
	tags: ['autodocs'],
};

const Template = (args) => <InvitationReqBtn {...args} />;

export const AcceptBtn = Template.bind({});
AcceptBtn.args = {
	type: 'accept',
	action: () => console.log('request accepted!'),
};

export const DeclineBtn = Template.bind({});
DeclineBtn.args = {
	type: 'decline',
	action: () => console.log('request declined!'),
};
