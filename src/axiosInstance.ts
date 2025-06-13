import axios from 'axios';

let token: string | null = null;

export const setToken = (newToken: string) => {
    token = newToken;
};

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
    if (token) {
        config.headers['x-access-token'] = token;
    }
    return config;
})

export default axiosInstance;