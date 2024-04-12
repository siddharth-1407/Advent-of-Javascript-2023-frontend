import Logo from './components/Logo';

export default {
	title: 'Logo',
	component: Logo,
	tags: ['autodocs'],
};

const Template = (args) => <Logo {...args} />;

export const LogoDark = Template.bind({});
LogoDark.args = {
	theme: 'dark',
	size: 201,
};

export const LogoLight = Template.bind({});
LogoLight.args = {
	theme: 'light',
	size: 201,
};
