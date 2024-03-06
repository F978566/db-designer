import { createSlice } from '@reduxjs/toolkit';
import {
    login,
    loadUser,
    checkAuthenticated,
    signup,
    verify,
} from '../actions/auth';
import {
    IDLE,
    LOGIN,
    LOGOUT,
    CHECK_AUTH,
    PENDING_LOGIN,
    PENDING_LOAD_USER,
    PENDING_SIGNUP,
    PENDING_CHECK_AUTH,
    PENDING_VERIFY,
    VERIFY,
    LOAD_USER,
    SIGNUP,
} from './statuses';


const initialState = {
    user: {
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),
        isAuthenticated: null,
        user: null,
    },
    status: IDLE,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state, action) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            state.user.isAuthenticated = null;
            state.user.user = null;
            state.status = LOGOUT;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                if (state.status === PENDING_LOGIN) {
                    localStorage.setItem('access', action.payload.access);
                    localStorage.setItem('refresh', action.payload.refresh);
                    state.user.access = localStorage.getItem('access');
                    state.user.refresh = localStorage.getItem('refresh');
                    state.status = LOGIN;
                    state.user.isAuthenticated = true;
                }
            })
            .addCase(login.pending, (state, action) => {
                if (state.user.isAuthenticated === null) {
                    state.status = PENDING_LOGIN;
                }
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.user.user = action.payload;
                state.status = LOAD_USER;
            })
            .addCase(loadUser.pending, (state, action) => {
                if (state.user.isAuthenticated !== null) {
                    state.status = PENDING_LOAD_USER;
                }
            })
            .addCase(signup.fulfilled, (state, action) => {
                if (state.status === PENDING_SIGNUP){
                    state.user.isAuthenticated = false;
                    state.status = SIGNUP;
                }
            })
            .addCase(signup.pending, (state, action) => {
                if (state.status === IDLE) {
                    state.status = PENDING_SIGNUP;
                }
            })
            .addCase(verify.fulfilled, (state, action) => {
                if (state.status === PENDING_VERIFY) {
                    state.status = VERIFY;
                }
            })
            .addCase(verify.pending, (state, action) => {
                if (state.user.isAuthenticated === IDLE) {
                    state.status = PENDING_VERIFY;
                }
            })
            .addCase(checkAuthenticated.fulfilled, (state, action) => {
                if (state.status === PENDING_CHECK_AUTH){
                    state.user.isAuthenticated = true;
                    state.status = CHECK_AUTH;
                }
            })
            .addCase(checkAuthenticated.pending, (state, action) => {
                if (state.status === IDLE) {
                    state.status = PENDING_CHECK_AUTH;
                }
            })
    }
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = state => state.auth.user.isAuthenticated;
export const selectUser = state => state.auth.user.user;

export default authSlice.reducer;