import Footer from '../../FooterComponents/Footer';

export default function AuthLayout({ children }) {
	return (
		<>
			<div className='z-10 relative min-h-screen bg-auth bg-silverTree dark:bg-nileBlue bg-no-repeat bg-[center_top] bg-[length:1440px_auto] xl:bg-[length:100%_auto] px-4'>
				<img
					src='/overlays/logo__secret-santa.svg'
					alt='logo'
					className='w-4/5 max-w-xs md:max-w-sm 2xl:max-w-lg  mx-auto pt-20 2xl:pt-16 pointer-events-none'
				/>
				<div className=' grid place-items-center pt-14'>{children}</div>
			</div>
			<Footer />
		</>
	);
}
