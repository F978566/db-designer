import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
})

const DataTypeService = {
    async getAllDataTypes() {
        if (localStorage.getItem('access')) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                }
            };

            const res = await axiosInstance.get('/datatypes/', config);

            return res.data;
        }
    }
}


export default DataTypeService;