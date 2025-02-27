import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import AuthReducer from './auth/auth';

export const store = configureStore({
	reducer: {
		Auth: AuthReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
