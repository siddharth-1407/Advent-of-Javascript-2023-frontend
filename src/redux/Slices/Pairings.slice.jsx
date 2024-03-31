import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../../Services/Supabase';

const initialState = {
	pairing: [],
	loading: true,
	error: null,
};

export const getPairings = createAsyncThunk('pairings/fetchByEventId', async (eventId, { dispatch, getState }) => {
	if (!eventId) {
		console.error('eventId parameter not provided');
		return [];
	}
	try {
		const { data, error } = await supabase.from('Pairings').select('id,santaId,personId,eventId').match({
			eventId: eventId,
		});
		if (!error) {
			return data;
		} else {
			console.log(error);
			return { status: error.status, message: error.message };
		}
	} catch (error) {
		console.log(error);
		return {};
	}
});
const Slice = createSlice({
	name: 'pairings',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getPairings.pending, (state) => {
			state.loading = true;
			state.error = null;
		}),
			builder.addCase(getPairings.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			}),
			builder.addCase(getPairings.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.pairing = action.payload;
			});
	},
});

export default Slice.reducer;
