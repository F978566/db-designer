import { createSlice } from '@reduxjs/toolkit';
import { loadProjects } from '../actions/project';


const initialState = {
    project: null,
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        selectedProject(state, action) {
            state.project = action.payload;
        }
    },
});

export const { selectedProject } = projectsSlice.actions;

export const projectSelector = state => state.projects.project;

export default projectsSlice.reducer;