import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

export const ProjectService = { 
    async postProject({name, description, user}) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };

            const user_id = user['id'];

            const body = JSON.stringify({ name, description, 'user': user_id })

            const res = await axiosInstance.post('/projects/', body, config);

            return res.data;
        }
    },
    async getProjects() {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };
            const res = await axiosInstance.get('/projects/', config);
            return res.data;
        }
    },
}