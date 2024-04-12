import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, cubicBezier, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { ModelType, handleModel } from '../../../../redux/Slices/Model.slice';

const WrapperAnime = {
	show: {
		opacity: 1,
		display: 'grid',
	},
	hide: {
		opacity: 0,
		display: 'none',
		transition: {
			display: {
				delay: 0.3,
			},
		},
	},
};
const modelAnime = {
	show: {
		y: 0,
		opacity: 1,
		display: 'grid',
	},
	hide: {
		y: '-200px',
		opacity: 0,
		display: 'none',
		transition: {
			y: {
				ease: cubicBezier(0.76, 0, 0.24, 1),
			},
			opacity: {
				duration: 0.2,
			},
			display: {
				delay: 0.3,
			},
		},
	},
};
export default function ModelWrapper({ children, isModelVisible }) {
	const ModelRef = useRef(null);
	const dispatch = useDispatch();
	useEffect(() => {
		function handleClick(e) {
			if (!ModelRef.current) return;
			if (!ModelRef?.current?.contains(e.target)) {
				dispatch(handleModel({ type: ModelType.triggerPairingModel, value: false }));
			}
		}
		window.addEventListener('mousedown', handleClick);
		return () => window.removeEventListener('mousedown', handleClick);
	}, []);
	return (
		<AnimatePresence>
			{isModelVisible && (
				<motion.div
					variants={WrapperAnime}
					initial={'hide'}
					animate={'show'}
					exit={'hide'}
					className='z-999 fixed w-screen h-screen px-4 top-0 left-0 grid place-items-center bg-black/40'>
					<motion.div
						ref={ModelRef}
						variants={modelAnime}
						initial={'hide'}
						animate={'show'}
						exit={'hide'}
						className='h-fit bg-red-500 place-items-center'>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

ModelWrapper.propTypes = {
	children: PropTypes.node,
	isModelVisible: PropTypes.bool,
};
