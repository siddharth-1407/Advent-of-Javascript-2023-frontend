import { configureStore } from '@reduxjs/toolkit';
import themeReducers from './Slices/AppTheme.slice';
import model from './Slices/Model.slice';
import user from './Slices/User.slice';
import wishes from './Slices/Wishlist.slice';
import pairs from './Slices/Pairings.slice';
import currentEvent from './Slices/Event.slice';
import invitees from './Slices/InviteList.slice';
import drawers from './Slices/Drawers.slice';

export const store = configureStore({
	reducer: {
		theme: themeReducers,
		model: model,
		user: user,
		invites: invitees,
		events: currentEvent,
		wishlist: wishes,
		pairings: pairs,
		drawers: drawers,
	},
});
