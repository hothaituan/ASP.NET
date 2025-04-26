import axios from "axios";

const Api = axios.create({
    baseURL: 'https://localhost:7042/api',
});

Api.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);

export default Api;
