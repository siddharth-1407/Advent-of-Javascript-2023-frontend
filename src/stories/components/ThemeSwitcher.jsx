import React from 'react';
import FormField from './FormField';
import { updateTheme } from '../../redux/Slices/AppTheme.slice';
import { useDispatch, useSelector } from 'react-redux';

export default function ThemeSwitcher() {
	const dispatch = useDispatch();
	const appTheme = useSelector((data) => data.theme);
	return (
		<div className='@container w-full flex justify-between'>
			<FormField
				type='radio'
				label='Light'
				value='light'
				name='theme'
				checked={appTheme.theme === 'light'}
				onChange={() => dispatch(updateTheme('light'))}
			/>
			<FormField
				type='radio'
				label='Dark'
				value='dark'
				name='theme'
				checked={appTheme.theme === 'dark'}
				onChange={() => dispatch(updateTheme('dark'))}
			/>
			<FormField
				type='radio'
				label='System'
				value='system'
				name='theme'
				checked={appTheme.theme === 'system'}
				onChange={() => dispatch(updateTheme('system'))}
			/>
		</div>
	);
}
