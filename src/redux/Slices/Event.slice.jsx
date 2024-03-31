import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../Services/Supabase';
import { fetchEventsJoinedByUser } from '../../Utils/Supabase';

const initialState = {
	currentEvent: {},
	userEvents: [],
	eventsJoinedByUser: [],
	allEvents: [],
	loading: true,
	error: null,
};

export const getEventsJoinedByUser = createAsyncThunk('eventsJoinedByUser', async (userEmail, { dispatch, getState }) => {
	try {
		let allEventsJoinedByUser = await fetchEventsJoinedByUser(userEmail);
		if (allEventsJoinedByUser?.length === 0) return [];
		allEventsJoinedByUser?.sort((eventA, eventB) => {
			if (eventA?.date > eventB?.date) {
				return 1;
			} else if (eventA?.date < eventB?.date) {
				return -1;
			} else {
				return 0;
			}
		});

		return allEventsJoinedByUser;
	} catch (error) {
		console.log(error);
		return { status: 500, message: error.message };
	}
});
export const getUserEvents = createAsyncThunk('event/fetchByOwnerId', async (userId, { dispatch, getState }) => {
	try {
		const { data, error } = await supabase.from('Events').select('id,date,name,sendReminder,ownerId,pairingTriggered').match({
			ownerId: userId,
		});
		if (!error) {
			console.log(data);
			return data;
		} else {
			console.log('Error getting user events : ', error);
			return [];
		}
	} catch (error) {
		console.log(error);
		return { status: 500, message: error?.message };
	}
});
export const getEvent = createAsyncThunk('event/fetchByName', async (eventName, { dispatch, getState }) => {
	try {
		const { data, error } = await supabase.from('Events').select('id,date,name,sendReminder,ownerId,pairingTriggered').match({
			name: eventName,
		});
		if (!error && data.length > 0) {
			return data[0];
		} else {
			console.log({ status: error.status, message: error.message });
			return undefined;
		}
	} catch (error) {
		console.log({ status: 500, message: error });
		return undefined;
	}
});
const Slice = createSlice({
	name: 'Event',
	initialState,
	reducers: {
		setCurrentEvent: (state, action) => {
			state.currentEvent = action.payload;
		},
		removeCurrentEvent: (state, action) => {
			state.currentEvent = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getEvent.pending, (state) => {
			state.loading = true;
		}),
			builder.addCase(getEvent.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			}),
			builder.addCase(getEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.currentEvent = action.payload;
				state.error = null;
			});
		builder.addCase(getUserEvents.pending, (state) => {
			state.loading = true;
		}),
			builder.addCase(getUserEvents.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			}),
			builder.addCase(getUserEvents.fulfilled, (state, action) => {
				state.loading = false;
				state.userEvents = action.payload;
				state.error = null;
			});
		builder.addCase(getEventsJoinedByUser.pending, (state) => {
			state.loading = true;
		}),
			builder.addCase(getEventsJoinedByUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			}),
			builder.addCase(getEventsJoinedByUser.fulfilled, (state, action) => {
				state.loading = false;
				state.eventsJoinedByUser = action.payload;
				state.error = null;
			});
	},
});

export const { setCurrentEvent, removeCurrentEvent } = Slice.actions;
export default Slice.reducer;
