import AuthLayout from '../components/layouts/Auth/AuthLayout';
import AuthTitle from '../components/layouts/Auth/AuthTitle';
import ThemeButton from '../stories/components/ThemeButton';
import { Helmet } from 'react-helmet';

export default function NotFound() {
	return (
		<AuthLayout>
			<Helmet>
				<title>{`Not Found| Secret Santa`}</title>
				<meta
					name='description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='keywords' content={`Secret Santa, Not Found, events, holiday, gift exchange, christmas, new year`} />
				<meta property='og:title' content={`Not Found | Secret Santa`}></meta>
				<meta
					property='og:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'
				/>
				<meta name='twitter:title' content={`Not Found | Secret Santa`} />
				<meta
					name='twitter:description'
					content='Explore upcoming Secret Santa events in our app and join the festive fun with friends and family.'></meta>
			</Helmet>
			<img src='/loader/loader_snowman.svg' alt='' />
			<AuthTitle title={'404'} />
			<div className='flex flex-col gap-4 items-center'>
				<p className='py-2 text-center uppercase font-medium text-3xl text-white'>Page not found</p>
				<p className='py-4 text-center text-white text-xl max-w-[700px]'>
					The page you were looking for might have been removed or moved to a different address. Go back to home?
				</p>
				<ThemeButton to={'/'} link size={'sm'} className='mx-auto'>
					Home
				</ThemeButton>
			</div>
		</AuthLayout>
	);
}
