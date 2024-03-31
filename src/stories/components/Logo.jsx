import React from 'react';
import PropTypes from 'prop-types'; //

export default function Logo({ theme = 'light', size = 201 }) {
	return (
		<>
			{theme === 'light' && (
				<img
					src='/logos/footer-logo__secret-santa-light.svg'
					width={size}
					alt='secret santa logo'
					className='h-auto dark:hidden pointer-events-none'
				/>
			)}
			{theme === 'dark' && (
				<img
					src='/logos/footer-logo__secret-santa-dark.svg'
					width={size}
					alt='secret santa logo'
					className='h-auto dark:block hidden pointer-events-none'
				/>
			)}
		</>
	);
}

Logo.propTypes = {
	theme: PropTypes.oneOf(['light', 'dark']),
	size: PropTypes.number,
};
