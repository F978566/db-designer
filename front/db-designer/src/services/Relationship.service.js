import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})


export const RelationshipService = {
    async getProjectRelationShips({ project_id }) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            }
            const res = await axiosInstance.get(`/relationship/project-relationships/${project_id}/`, config)
            
            return res.data;
        }

    },
    async postRelationship(data) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            }
            const body = JSON.stringify({ ...data });
            console.log(body);
    
            const res = await axiosInstance.post('relationship/', body, config);
    
            return res.data;
        }
    }
}