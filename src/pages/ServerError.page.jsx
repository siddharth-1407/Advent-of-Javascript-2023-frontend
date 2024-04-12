import AuthLayout from '../components/layouts/Auth/AuthLayout';
import ThemeButton from '../stories/components/ThemeButton';
import { Helmet } from 'react-helmet';

export default function ServerError() {
	return (
		<AuthLayout>
			<Helmet>
				<title>{`Something went wrong | Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa,  events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Something went wrong | Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Something went wrong | Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
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
