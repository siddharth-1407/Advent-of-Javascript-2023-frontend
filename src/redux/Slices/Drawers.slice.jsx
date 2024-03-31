import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	accounts: false,
	event: false,
	wishlist: false,
};

const Slice = createSlice({
	name: 'DrawerHandlerSlice',
	initialState,
	reducers: {
		handleAccount: (state, action) => {
			state.accounts = action.payload;
		},
		handleEvent: (state, action) => {
			state.event = action.payload;
		},
		handleWishlist: (state, action) => {
			state.wishlist = action.payload;
		},
	},
});

export const { handleAccount, handleEvent, handleWishlist } = Slice.actions;
export default Slice.reducer;
