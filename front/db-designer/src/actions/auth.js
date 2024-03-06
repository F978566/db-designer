import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkAuthenticated = createAsyncThunk('auth/checkAuthenticated', 
    async () => {
        const access_token = localStorage.getItem('access');

        if (access_token != null) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            const body = JSON.stringify({ "token": access_token });

            try {
                const res = await axios.post(`http://127.0.0.1:8000/api/auth/jwt/verify/`, body, config);
                if (res.data.code !== 'token_not_valid') {
                    return res.data;
                } else {
                    return
                }
            } catch (e) {
                return
            }
        } else {
            throw new Error('There is no access_token');
        }
    }
);

export const loadUser = createAsyncThunk('auth/loadUser', 
    async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            const res = await axios.get(`http://127.0.0.1:8000/api/auth/users/me/`, config);
            return res.data;
        }
    }
);

export const login = createAsyncThunk('auth/login', 
    async ({email, password}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const body = JSON.stringify({ email, password });
            const res = await axios.post(`http://127.0.0.1:8000/api/auth/jwt/create/`, body, config);
            
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const signup = createAsyncThunk('auth/signup',
    async ({email, first_name, last_name, password, re_password}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({ email, first_name, last_name, password, re_password });
    
        const res = await axios.post(`http://127.0.0.1:8000/api/auth/users/`, body, config);
        return res.data;
    }
);

export const verify = createAsyncThunk('auth/verify', 
    async ({ uid, token }) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        try {
            const body = JSON.stringify({ uid, token });

            const res = await axios.post(`http://127.0.0.1:8000/api/auth/users/activation/`, body, config);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    }
);