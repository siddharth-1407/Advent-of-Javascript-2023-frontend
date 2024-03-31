import AuthLayout from '../components/layouts/Auth/AuthLayout';
import ThemeButton from '../stories/components/ThemeButton';

export default function ServerError() {
	return (
		<AuthLayout>
			<p
				className='text-5xl sm:text-7xl text-white font-condensed relative text-center
                           before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-[5rem] before:h-0.5 before:bg-white
                           after:absolute after:top-1/2 after:-translate-y-1/2 after:-right-[5rem] after:h-0.5 after:bg-white
                           before:w-14 after:w-14 md:before:w-16 md:after:w-16'>
				Something went wrong
			</p>
			<div className='flex flex-col gap-4 items-center'>
				<p className='py-8 text-center text-white text-xl max-w-[700px]'>
					Opps! something went wrong from our side. Go back and try again or navigate to home.
				</p>
				<ThemeButton to={'/'} link size={'sm'} className='mx-auto'>
					Home
				</ThemeButton>
			</div>
		</AuthLayout>
	);
}
