import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	isLoggedIn: boolean;
	accessToken: string | null;
}

const initialState: AuthState = {
	isLoggedIn: !!localStorage.getItem('accessToken'),
	accessToken: localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess: (state, action: PayloadAction<string>) => {
			state.isLoggedIn = true;
			state.accessToken = action.payload;
			localStorage.setItem('accessToken', action.payload);
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.accessToken = null;
			localStorage.removeItem('accessToken');
			window.location.replace('/login');
		},
	},
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
