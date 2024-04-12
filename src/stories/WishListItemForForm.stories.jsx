import WishListItemForForm from './components/WishList/WishListItemForForm';

export default {
	title: 'WishListItemForForm',
	component: WishListItemForForm,
	tags: ['autodocs'],
};

const Template = (args) => <WishListItemForForm {...args} />;

export const FeedItem_1 = Template.bind({});
FeedItem_1.args = {
	index: 0,
	title: 'Iphone 15',
	url: 'https://www.amazon.in/Apple-iPhone-15-128-GB/dp/B0CHX1W1XY?th=1',
};

export const FeedItem_2 = Template.bind({});
FeedItem_2.args = {
	index: 1,
	title: 'ASUS ROG Ryujin III 360 ARGB EVA-02 Edition All-in-one Liquid CPU Cooler with 360mm Radiator. Asetek 8th gen Pump, 3X Magnetic 120mm ARGB Fans(Daisy Chain Design), 3.5” OLCD Display,Red ',
	url: 'https://www.amazon.com/ASUS-ROG-III-ARGB-EVA-02/dp/B0CHHL6FFG/ref=sr_1_1?crid=2X2PSHC0EBFVB&keywords=custom+pc+neon+genesis&qid=1703716492&sprefix=custome+pc+neon+genesi%2Caps%2C333&sr=8-1',
};

export const FeedItem_3 = Template.bind({});
FeedItem_3.args = {
	index: 2,
	title: 'ELDEN RING',
	url: 'https://store.steampowered.com/app/1245620/ELDEN_RING/',
};
