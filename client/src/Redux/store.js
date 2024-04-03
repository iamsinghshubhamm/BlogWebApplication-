import { createSlice, configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: localStorage.getItem('user') ? true : false
    },
    reducers: {
        login(state) {
            state.isLogin = true;
            localStorage.setItem('user', true);
        },
        logout(state) {
            state.isLogin = false;
            localStorage.removeItem('user');
        }
    }
});

export const authActions = authSlice.actions;

export const store = configureStore({
    reducer: authSlice.reducer
});
