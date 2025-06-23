import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		// auth: authReducer,
		// 다른 slice도 여기에 추가
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
