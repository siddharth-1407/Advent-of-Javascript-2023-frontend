import HamBurgerButton from './components/HamBurgerButton';

export default {
	title: 'HamburgerButton',
	component: HamBurgerButton,
	tags: ['autodocs'],
};

const Template = (args) => <HamBurgerButton {...args} />;

export const ButtonClosed = Template.bind({});
ButtonClosed.args = {
	isOpen: false,
	setIsOpen: () => setIsOpen((prev) => !prev),
	background: 'orange',
	color: 'black',
};

export const ButtonOpened = Template.bind({});
ButtonOpened.args = {
	isOpen: true,
	setIsOpen: () => setIsOpen((prev) => !prev),
	background: 'orange',
	color: 'black',
};
