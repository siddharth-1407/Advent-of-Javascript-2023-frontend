import RoundButton from './components/RoundButton';

export default {
	title: 'RoundButton',
	component: RoundButton,
	tags: ['autodocs'],
};

const Template = (args) => <RoundButton {...args} />;

export const Success_Btn = Template.bind({});
Success_Btn.args = {
	type: 'success',
	onClick: () => {
		console.log('clicked');
	},
};

export const Warning_Btn = Template.bind({});
Warning_Btn.args = {
	type: 'warning',
	onClick: () => {
		console.log('clicked');
	},
};

export const Error_Btn = Template.bind({});
Error_Btn.args = {
	type: 'error',
	onClick: () => {
		console.log('clicked');
	},
};
