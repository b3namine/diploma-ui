import axios from "axios";

export const DEFAULT_URL = 'http://localhost:5000';

const $api = axios.create({
    withCredentials: true,
    baseURL: DEFAULT_URL,
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token && config.headers) {
        config.headers = {
            'Accept': 'text/plain',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

    }
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
    }
    throw error;
})

export default $api;
