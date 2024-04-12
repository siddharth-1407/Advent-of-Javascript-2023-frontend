import React, { useRef, useState } from 'react';
import Icon from './Icon';
import PropTypes from 'prop-types'; //

export default function FormField({ type = 'text', label, fileType, accept, name, value, onChange, cols, rows, checked }) {
	return (
		<>
			{type === 'text' && <TextInput label={label} name={name} value={value} onChange={onChange} />}
			{type === 'email' && <EmailInput label={label} name={name} value={value} onChange={onChange} />}
			{type === 'password' && <PasswordInput label={label} name={name} value={value} onChange={onChange} />}
			{type === 'textarea' && <TextareaInput label={label} name={name} value={value} onChange={onChange} cols={cols} rows={rows} />}
			{type === 'checkbox' && <CheckBoxInput label={label} name={name} value={value} checked={checked} onChange={onChange} />}
			{type === 'radio' && <RadioInput label={label} name={name} value={value} checked={checked} onChange={onChange} />}
			{type === 'date' && <DateInput label={label} name={name} value={value} onChange={onChange} />}
			{type === 'file' && <FileInput label={label} name={name} fileType={fileType} accept={accept} value={value} onChange={onChange} />}
		</>
	);
}
FormField.propTypes = {
	type: PropTypes.oneOf(['text', 'email', 'password', 'textarea', 'checkbox', 'radio', 'date']).isRequired,
	label: PropTypes.string.isRequired,
	fileType: PropTypes.string,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	rows: (props, propName) => {
		if (props.type !== 'textarea' && props[propName]) {
			throw new Error(`"${propName}" prop can only be used with "textarea" FormField type`);
		} else {
			PropTypes.number;
		}
	},
	cols: (props, propName) => {
		if (props.type !== 'textarea' && props[propName]) {
			throw new Error(`"${propName}" prop can only be used with "textarea" FormField type`);
		} else {
			PropTypes.number;
		}
	},
	checked: (props, propName) => {
		if ((props.type != 'checkbox' || props.type != 'radio') && props[propName]) {
			throw new Error(`${propName} can only be used with prop type "checkbox" and "radio".`);
		} else {
			PropTypes.bool;
		}
	},
};

function TextInput({ label, value, name, onChange }) {
	const [touched, setTouched] = useState(false);

	return (
		<div className='relative'>
			<input
				id={name}
				type='text'
				name={name}
				placeholder={label}
				required
				className={`peer w-full text-2xl md:text-3xl px-3 pt-4 pb-2 md:px-4 md:pt-5 md:pb-3 border-2 border-transparent
						font-handwriting outline-none focus-within:outline-none ${touched && 'invalid:bg-orangeRed invalid:border-fireEngineRed invalid:text-white'} 
						placeholder:font-handwriting 
						focus-within:placeholder-shown:placeholder:
						placeholder-shown:placeholder:text-transparent`}
				value={value}
				onChange={onChange}
				onBlur={() => setTouched(true)}
			/>
			<label
				htmlFor='name'
				className={`absolute 
				text-spanishGreen dark:text-nileBlue
						peer-valid:top-0 
						peer-valid:left-2 
						peer-invalid:left-2 
						peer-invalid:top-4 
						${touched && 'peer-invalid:text-white'}
						peer-focus-within:top-0 
						peer-focus-within:left-2 
						peer-placeholder-shown:text-3xl 
						peer-focus-within:text-sm
						md:peer-valid:top-0 
						md:peer-valid:left-2 
						md:peer-invalid:left-4 
						md:peer-invalid:top-6
						md:peer-focus-within:top-0 
						md:peer-focus-within:left-2 
						md:peer-placeholder-shown:text-3xl 
						md:peer-focus-within:text-lg 
						text-sm md:text-lg font-handwriting transition-all`}>
				{label}
			</label>
		</div>
	);
}
function EmailInput({ label, name, value, onChange }) {
	const [touched, setTouched] = useState(false);

	return (
		<div className='relative w-full'>
			<input
				type='email'
				id={label}
				name={name}
				placeholder='email'
				pattern='^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z.]{2,}$'
				required
				className={`peer w-full text-2xl md:text-3xl px-3 pt-4 pb-2 md:px-4 md:pt-5 md:pb-3 border-2 border-transparent
						font-handwriting outline-none  ${touched && 'invalid:bg-orangeRed invalid:border-fireEngineRed invalid:text-white'} 
						focus-within:outline-none placeholder:font-handwriting 
						focus-within:placeholder-shown:placeholder:
						placeholder-shown:placeholder:text-transparent`}
				value={value}
				onBlur={() => setTouched(true)}
				onChange={onChange}
			/>
			<label
				htmlFor={label}
				className={`absolute 
				      text-spanishGreen dark:text-nileBlue
						peer-valid:top-0 
						peer-valid:left-2 
						peer-invalid:left-2 
						peer-invalid:top-4 
						${touched && 'peer-invalid:text-white'}
						peer-focus-within:top-0 
						peer-focus-within:left-2 
						peer-placeholder-shown:text-3xl 
						peer-focus-within:text-sm
						md:peer-valid:top-0 
						md:peer-valid:left-2 
						md:peer-invalid:top-0 
						md:peer-invalid:left-2 
						md:peer-invalid:peer-placeholder-shown:top-6 
						md:peer-invalid:peer-placeholder-shown:left-4 
						md:peer-focus-within:peer-placeholder-shown:top-0 
						md:peer-focus-within:peer-placeholder-shown:left-2 
						md:peer-placeholder-shown:text-3xl 
						md:peer-focus-within:text-lg 
						text-sm md:text-lg font-handwriting transition-all`}>
				{label}
			</label>
		</div>
	);
}
function PasswordInput({ label, value, name, onChange }) {
	const [show, setShow] = useState(false);
	const [touched, setTouched] = useState(false);
	return (
		<div className='relative'>
			<input
				type={show ? 'text' : 'password'}
				name={name}
				id={label}
				placeholder={label}
				required
				className={`peer w-full text-2xl md:text-3xl pl-3 pr-16 md:pr-20 pt-4 pb-2 md:px-4 md:pt-5 md:pb-3 border-2 border-transparent
			               font-handwriting outline-none focus-within:outline-none ${touched && 'invalid:bg-orangeRed invalid:border-fireEngineRed'}
						   placeholder:font-handwriting 
			               placeholder-shown:placeholder:text-transparent`}
				value={value}
				onBlur={() => setTouched(true)}
				onChange={onChange}
			/>
			<label
				htmlFor={label}
				className={`absolute 
				         text-spanishGreen dark:text-nileBlue
			               peer-valid:top-0 
			               peer-valid:left-2 
			               peer-invalid:left-2 
			               peer-invalid:top-4 
						   ${touched && 'peer-invalid:text-white'}
			               peer-focus-within:top-0 
			               peer-focus-within:left-2 
			               peer-placeholder-shown:text-3xl 
			               peer-focus-within:text-sm
			               md:peer-valid:top-0 
			               md:peer-valid:left-2 
			               md:peer-invalid:left-4 
			               md:peer-invalid:top-6
			               md:peer-focus-within:top-0 
			               md:peer-focus-within:left-2 
			               md:peer-placeholder-shown:text-3xl 
			               md:peer-focus-within:text-lg 
			               text-sm md:text-lg font-handwriting transition-all`}>
				{label}
			</label>
			<button
				type='button'
				className={`absolute right-3 md:right-4 top-4 w-fit ${touched && 'peer-invalid:fill-white'}`}
				onClick={() => setShow(!show)}>
				<div className='block md:hidden'>{show ? <Icon type='eyeOpened' size={36} /> : <Icon type='eyeClosed' size={36} />}</div>

				<div className='hidden md:block'>{show ? <Icon type='eyeOpened' size={48} /> : <Icon type='eyeClosed' size={48} />}</div>
			</button>
		</div>
	);
}
function TextareaInput({ label, value, name, onChange, ...props }) {
	const [touched, setTouched] = useState(false);

	return (
		<div className='relative'>
			<textarea
				id={name}
				type='text'
				name={name}
				placeholder={label}
				{...props}
				required
				className={`peer w-full text-2xl md:text-3xl px-3 pt-4 pb-2 md:px-7 md:pt-9 md:pb-6 border-2 border-transparent rounded-lg
						font-handwriting outline-none focus-within:outline-none ${touched && 'invalid:bg-orangeRed invalid:border-fireEngineRed invalid:text-white'} 
						placeholder:font-handwriting 
						focus-within:placeholder-shown:placeholder:
						placeholder-shown:placeholder:text-transparent`}
				value={value}
				onChange={onChange}
				onBlur={() => setTouched(true)}
			/>
			<label
				htmlFor='name'
				className={`absolute 
				      text-spanishGreen dark:text-nileBlue
						peer-valid:top-0 
						peer-valid:left-2 
						peer-invalid:left-3 
						peer-invalid:top-4 
						${touched && 'peer-invalid:text-white'}
						peer-focus-within:top-0 
						peer-focus-within:left-2 
						peer-placeholder-shown:text-3xl 
						peer-focus-within:text-sm
						md:peer-valid:top-0 
						md:peer-valid:left-2 
						md:peer-invalid:left-7 
						md:peer-invalid:top-7
						md:peer-focus-within:top-0 
						md:peer-focus-within:left-2 
						md:peer-placeholder-shown:text-3xl 
						md:peer-focus-within:text-lg 
						text-sm md:text-lg font-handwriting transition-all`}>
				{label}
			</label>
		</div>
	);
}
function CheckBoxInput({ label, value, name, checked, onChange }) {
	return (
		<div className='flex flex-row-reverse items-start justify-end gap-4 relative'>
			<label htmlFor={name} className='uppercase select-none font-handwriting text-xl leading-tight pt-1.5 cursor-pointer dark:text-white'>
				{label}
			</label>
			<div className='relative min-w-[2rem] aspect-square grid place-items-center p-0.5 bg-white rounded'>
				<input
					type='checkbox'
					className='peer appearance-none absolute w-full h-full top-0 left-0 cursor-pointer'
					name={name}
					id={name}
					value={value}
					checked={checked}
					onChange={onChange}
				/>

				<Icon type={'check'} className='peer-checked:block hidden fill-spanishGreen  w-full' />
			</div>
		</div>
	);
}
function RadioInput({ label, value, name, checked, onChange }) {
	console.log(checked);
	return (
		<div className='flex flex-row-reverse items-center justify-end gap-4 relative'>
			<label
				htmlFor={label}
				className='uppercase select-none text-white font-handwriting text-base @xl:text-xl leading-tight pt-0.5 cursor-pointer'>
				{label}
			</label>
			<div className='relative w-5 h-5 @xl:w-8 @xl:h-8 aspect-square grid place-items-center @xl:p-0.5'>
				<input
					type='radio'
					className='peer appearance-none absolute w-full h-full top-0 left-0 cursor-pointer bg-white/60 checked:bg-white rounded-full'
					name={name}
					value={value}
					id={label}
					checked={checked}
					onChange={onChange}
				/>
				<Icon type={'check'} className='peer-checked:block hidden fill-spanishGreen z-10 w-full relative -top-0.5 @xl:static' />
			</div>
		</div>
	);
}
function DateInput({ label, value, name, onChange }) {
	const inputRef = useRef(null);
	return (
		<div className='flex flex-col gap-1 relative'>
			<input
				ref={inputRef}
				type={'date'}
				name={name}
				id={label}
				value={value}
				placeholder={label}
				required
				className={`peer w-full text-2xl md:text-3xl px-3 pt-4 pb-2 md:px-4 md:pt-5 md:pb-3 border-2 border-transparent
						font-handwriting outline-none focus-within:outline-none placeholder:font-handwriting placeholder-shown:placeholder:text-transparent `}
				onChange={onChange}
			/>
			<button type='button' className={`pointer-events-none absolute right-3 md:right-4 top-4 w-fit bg-white`}>
				<div className='block md:hidden'>{<Icon type='calender' size={36} />}</div>
				<div className='md:block hidden'>{<Icon type='calender' size={48} />}</div>
			</button>
			<label
				htmlFor={label}
				className={`absolute text-spanishGreen dark:text-nileBlue
					   top-0 
					   left-2 
					   md:top-0 
					   md:left-2 
					   text-sm md:text-lg font-handwriting transition-all`}>
				{label}
			</label>
		</div>
	);
}
function FileInput({ label, fileType, accept, value, name, onChange }) {
	const [touched, setTouched] = useState(false);

	return (
		<div className='relative group'>
			<label
				htmlFor={name}
				className={`w-full text-2xl md:text-3xl px-4 pt-4 pb-2 md:px-5 md:pt-5 md:pb-3 flex justify-between items-center border-2 lg:border-4 border-dashed border-white hover:cursor-pointer hover:backdrop-brightness-50 transition-all`}>
				<span className='sr-only'>Choose a profile photo</span>
				<span className='text-2xl md:text-3xl text-white font-handwriting select-none'>{label}</span>
				{fileType && <span className='text-bombay text-base hidden md:block'>{`Drag and Drop an ${fileType}`}</span>}
				<Icon type='upload' className='w-7 h-7 md:w-10 md:h-10 text-xs fill-white ' />
			</label>
			<input
				id={name}
				type='file'
				name={name}
				accept={accept}
				placeholder={label}
				className='hidden'
				value={value}
				onChange={onChange}
				onBlur={() => setTouched(true)}
			/>
		</div>
	);
}
TextInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};
PasswordInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};
TextareaInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};
EmailInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};
CheckBoxInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.bool,
	checked: PropTypes.checked,
	onChange: PropTypes.func,
};
RadioInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.bool,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
};
FileInput.propTypes = {
	fileType: PropTypes.string,
	accept: PropTypes.string,
	value: PropTypes.instanceOf(FileInput),
	label: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
};
DateInput.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func,
};
