import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const loadProjects = createAsyncThunk('projects/loadProjects',
    async () => {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };
            const res = await axios.get('http://127.0.0.1:8000/api/projects/', config);
            return res.data;
        }
    }
);

export const chosenProject = createAsyncThunk('project/chosenProject')