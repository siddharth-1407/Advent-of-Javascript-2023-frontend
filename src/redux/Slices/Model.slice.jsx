import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	deleteInviteModel: false,
	deleteEventModel: false,
	triggerPairingModel: false,
};

export const ModelType = {
	deleteInvite: 'DELETE_INVITE',
	deleteEvent: 'DELETE_EVENT',
	triggerPairingModel: 'TRIGGER_PAIRING',
};

const Slice = createSlice({
	name: 'modelSlice',
	initialState,
	reducers: {
		handleModel: (state, action) => {
			if (action.payload.type == ModelType.deleteInvite) {
				state.deleteInviteModel = action.payload.value;
			}
			if (action.payload.type == ModelType.deleteEvent) {
				state.deleteEventModel = action.payload.value;
			}
			if (action.payload.type == ModelType.triggerPairingModel) {
				state.triggerPairingModel = action.payload.value;
			}
		},
	},
});

export const { handleModel } = Slice.actions;
export default Slice.reducer;
