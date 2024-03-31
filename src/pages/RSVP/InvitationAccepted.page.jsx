import React from 'react';
import AuthLayout from '../../components/layouts/Auth/AuthLayout';
import { RegisterationForm_Invite } from '../../components/Forms';
import AuthTitle from '../../components/layouts/Auth/AuthTitle';

export default function InvitationAccepted_page() {
	return (
		<AuthLayout>
			<main className='w-full flex flex-col justify-center items-center gap-10 py-4'>
				<div className='flex flex-col items-center gap-1'>
					<p className='font-handwriting 2xl:text-2xl text-white '>Awesome!</p>
					<AuthTitle title={'sign up'} />
				</div>
				<RegisterationForm_Invite />
			</main>
		</AuthLayout>
	);
}
