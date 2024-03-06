import { axiosInstance } from './Relationship.service';



export const RelationshipService = {
    async getProjectRelationShips({ project_id }) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            };
        }

        const res = axiosInstance.get(`/relationship/project-relationships/${project_id}/`);


        return res.data;
    },
    async postRelationship(data) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            };
        }

        console.log(data);

        // const body = JSON.stringify({ ...data });
        // const res = axiosInstance.post('relationship/', body, config);
        // return res.data;
    }
};
