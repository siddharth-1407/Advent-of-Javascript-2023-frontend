import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userData: {},
};

const Slice = createSlice({
	name: 'UserSlice',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.userData = action.payload;
		},
	},
});

export const { setUser } = Slice.actions;
export default Slice.reducer;
