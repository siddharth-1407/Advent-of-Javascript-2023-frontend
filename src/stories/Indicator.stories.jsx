import Indicator from './components/Indicator';

export default {
	title: 'Indicator',
	component: Indicator,
	tags: ['autodocs'],
};

const Template = (args) => <Indicator {...args} />;

export const Green = Template.bind({});
Green.args = {
	type: 'accepted',
	size: 48,
};

export const Yellow = Template.bind({});
Yellow.args = {
	type: 'invited',
	size: 48,
};

export const Red = Template.bind({});
Red.args = {
	type: 'declined',
	size: 48,
};
