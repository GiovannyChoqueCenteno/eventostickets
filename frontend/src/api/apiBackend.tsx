import axios from 'axios';

const apiBackend = axios.create({
    baseURL: 'http://localhost:4000/api',
});

export default apiBackend;