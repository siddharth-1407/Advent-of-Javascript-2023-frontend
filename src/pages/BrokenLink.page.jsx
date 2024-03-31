import React from 'react';
import AuthLayout from '../components/layouts/Auth/AuthLayout';
import AuthTitle from '../components/layouts/Auth/AuthTitle';
import ThemeButton from '../stories/components/ThemeButton';

export default function BrokenLink() {
	return (
		<AuthLayout>
			<img src='/loader/loader_snowman.svg' alt='' />
			<AuthTitle title={'Link is broken!'} />
			<div className='pt-12'>
				<ThemeButton to='/' link size='sm'>
					Home
				</ThemeButton>
			</div>
		</AuthLayout>
	);
}
