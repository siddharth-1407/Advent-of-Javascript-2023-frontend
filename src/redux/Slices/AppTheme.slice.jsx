import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	theme: localStorage.theme ? localStorage.theme : 'system',
};

const Slice = createSlice({
	name: 'appThemeSlice',
	initialState,
	reducers: {
		updateTheme: (state, action) => {
			state.theme = action.payload;
			localStorage.theme = action.payload;
		},
	},
});
export const { updateTheme } = Slice.actions;
export default Slice.reducer;
