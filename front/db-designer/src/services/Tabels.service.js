import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

export const TableService = {
    async postTable({ name, description, project }) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };

            const body = JSON.stringify({ name, description, project });

            const res = await axiosInstance.post('/tables/', body, config);
        }
    },
    async getTables({ project_id }){
        if (localStorage.getItem('access') && project_id) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };
            const res = await axiosInstance.get(`/tables/project-tables/${project_id}/`, config);
            return res.data;
        }
    },
    async deleteTable({ table_id }){
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };
            const res = await axiosInstance.delete(`/tables/${table_id}/`, config);

            return res.data;
        }
    },
    async patchTable(data) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };

            const body = JSON.stringify(data)

            const res = await axiosInstance.patch(`/tables/${data.table_id}/`, body, config);

            return res.data;
        }
    },
    async getAllProjectTablesExceptOne({ project_id, table_id }) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };

            const res = await axiosInstance.get(`/tables/all-project-tables-except-one/${project_id}/${table_id}/`, config);

            return res.data;
        }
    }
}