import React from 'react';
import { CreateEventForm } from '../../components/Forms';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import AuthTitle from '../../components/layouts/Auth/AuthTitle';

export default function CreateNewEvent() {
	return (
		<AuthLayout>
			<div className='w-full flex flex-col items-center gap-16'>
				<AuthTitle title={'Set up your event'} />
				<CreateEventForm />
			</div>
		</AuthLayout>
	);
}
