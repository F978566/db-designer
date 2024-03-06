import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/auth'
import projectsReducer from '../reducers/project'

export default configureStore({
    reducer: {
        auth: authReducer,
        projects: projectsReducer,
    }
})