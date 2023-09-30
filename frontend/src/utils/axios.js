import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    timeout: 5000, // timeout after 5 seconds
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance;
