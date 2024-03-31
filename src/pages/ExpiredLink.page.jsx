import AuthLayout from '../components/layouts/Auth/AuthLayout';
import AuthTitle from '../components/layouts/Auth/AuthTitle';
import ThemeButton from '../stories/components/ThemeButton';

export default function ExpiredLink() {
	return (
		<AuthLayout>
			<img src='/loader/loader_snowman.svg' alt='' />
			<AuthTitle title={'Link expired'} />
			<div className='flex flex-col gap-4 items-center'>
				<p className='py-2 text-center uppercase font-medium text-3xl text-white'></p>
				<p className='py-4 text-white text-xl max-w-[700px]'>Your invitation link expired.</p>
				<ThemeButton to={'/'} link size={'sm'} className='mx-auto'>
					Home
				</ThemeButton>
			</div>
		</AuthLayout>
	);
}
