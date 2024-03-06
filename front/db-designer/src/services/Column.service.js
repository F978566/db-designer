import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

export const ColumnService = {
    async getColumnsByTable(table_id) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };
            const res = await axiosInstance.get(`/columns/table-columns/${table_id}/`, config);

            return res.data;
        }
    },
    async getColumns(table_id){
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };
            const res = await axiosInstance.get(`/columns/table-columns/${table_id}/`, config);

            return res.data;
        }
    },
    async postColumn(data) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };
            
            const body = JSON.stringify(data);

            console.log(body)
            
            const res = await axiosInstance.post(`/columns/`, body, config);

            return res.data;
        }
    },
    async getAllColumnsRelatedToTheProjectExceptOneTable(table_id, project_id) {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };

            const res = await axiosInstance.get(`/columns/project-columns/${table_id}/${project_id}/`, config);

            return res.data;
        }
    }
}