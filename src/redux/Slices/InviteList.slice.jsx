import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../../Services/Supabase';

const initialState = {
	invitees: [],
	currentSelected: null,
	loading: true,
};

export const getInvites = createAsyncThunk('getInvites/fromEventId', async ({ eventId }) => {
	try {
		const { data, error } = await supabase.from('Invites').select('id,name,email,status', {
			where: {
				eventId,
			},
		});
		if (!error) {
			return data;
		} else {
			console.error('Error while getting invite list : ', error);
			return { status: error.status, message: error.message };
		}
	} catch (error) {
		console.log(error);
		return { status: error.status, message: error.message, promise: true };
	}
});
const Slice = createSlice({
	name: 'inviteList',
	initialState,
	reducers: {
		addInvitee: (state, action) => {
			state.invitees.push(action.payload);
		},
		removeInvitee: (state, action) => {
			state.invitees = state.invitees.filter((item) => item.id !== action.payload);
		},
		setCurrentSelected: (state, action) => {
			state.currentSelected = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getInvites.pending, (state, action) => {
			state.loading = true;
		}),
			builder.addCase(getInvites.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			}),
			builder.addCase(getInvites.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.invitees = action.payload;
			});
	},
});

export const { setInvitee, addInvitee, removeInvitee, setCurrentSelected } = Slice.actions;
export default Slice.reducer;
