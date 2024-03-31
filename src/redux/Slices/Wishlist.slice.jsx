import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../../Services/Supabase';

const initialState = {
	wishes: [],
	loading: true,
	error: null,
};

export const getWishlist = createAsyncThunk('Wishlist/fetchByUserId_eventId', async ({ userId, eventId }) => {
	try {
		const { data, error } = await supabase.from('Wishlist').select('id,name,url,siteDescription,siteImage').match({
			userId,
			eventId,
		});
		if (!error) {
			return data;
		} else {
			console.error('Error encountered while getting wishlist : ', error);
			return [];
		}
	} catch (error) {
		console.log('Error : ', error);
		return [];
	}
});
const Slice = createSlice({
	name: 'Wishlist',
	initialState,
	reducers: {
		addItem: (state, action) => {
			state.wishes.push(...action.payload);
		},
		removeItem: (state, action) => {
			state.wishes = state.wishes.filter((item) => item.id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getWishlist.pending, (state) => {
			state.loading = true;
		}),
			builder.addCase(getWishlist.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			}),
			builder.addCase(getWishlist.fulfilled, (state, action) => {
				state.wishes = action.payload;
				state.loading = false;
				state.error = null;
			});
	},
});

export const { addItem, removeItem } = Slice.actions;
export default Slice.reducer;
