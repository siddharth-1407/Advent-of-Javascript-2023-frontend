import React, { useCallback } from 'react';
import Icon from '../stories/components/Icon';
import ModelWrapper from '../stories/components/Models/Wrappers/ModelWrapper';
import DeleteEventModelContent from '../stories/components/Models/Contents/DeleteEventModelContent';
import { useDispatch, useSelector } from 'react-redux';
import { ModelType, handleModel } from '../redux/Slices/Model.slice';

export default function DeleteEventButton() {
	const dispatch = useDispatch();
	const model = useSelector((data) => data?.model?.deleteEventModel);
	const event = useSelector((data) => data?.events?.currentEvent);

	const handleDeleteEvent = () => {
		const currentDate = new Date();
		const eventDate = new Date(event?.date);
		if (currentDate < eventDate) {
			dispatch(handleModel({ type: ModelType.deleteEvent, value: true }));
		} else {
			console.error('Past events can not be deleted!');
		}
	};

	return (
		<>
			<button
				size={'sm'}
				onClick={handleDeleteEvent}
				className={
					'px-4 py-2 flex justify-center items-center gap-2 relative after:absolute after:opacity-0 hover:after:opacity-100 after:bg-white after:w-[calc(100%-16px)] after:h-0.5 after:left-3 after:bottom-0'
				}>
				<span>
					<Icon type='delete' size={24} className='fill-white' />
				</span>
				<span className='text-xl text-white font-medium fill-white'>Delete this event</span>
			</button>
			<ModelWrapper isModelVisible={model}>
				<DeleteEventModelContent />
			</ModelWrapper>
		</>
	);
}
