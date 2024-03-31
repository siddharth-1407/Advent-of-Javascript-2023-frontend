import FormField from './components/FormField';

export default {
	title: 'FormField',
	Element: FormField,
	tags: ['autodocs'],
};

const Template = (args) => <FormField {...args} />;

export const TextInput = Template.bind({});
TextInput.args = {
	type: 'text',
	label: 'Name',
	name: 'Name',
};

export const EmailInput = Template.bind({});
EmailInput.args = {
	type: 'email',
	label: 'Email',
	name: 'Email',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
	type: 'password',
	label: 'Password',
	name: 'Password',
};

export const TextareaInput = Template.bind({});
TextareaInput.args = {
	type: 'textarea',
	label: 'Message',
	name: 'message',
	rows: 5,
};

export const CalenderInput = Template.bind({});
CalenderInput.args = {
	type: 'date',
	label: 'Event Type',
	name: 'eventType',
};

export const FileInput = Template.bind({});
FileInput.args = {
	type: 'file',
	fileType: 'Image',
	label: 'Avatar',
	name: 'eventType',
};

export const CheckboxInput = Template.bind({});
CheckboxInput.args = {
	type: 'checkbox',
	fileType: 'Image',
	label: 'Send out a reminder before event',
	name: 'sentReminder',
};
export const RadioInput = Template.bind({});
RadioInput.args = {
	type: 'radio',
	fileType: 'Image',
	label: 'Send out a reminder before event',
	name: 'sentReminder',
};
