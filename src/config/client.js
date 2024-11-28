import axios, {AxiosHeaders} from 'axios';

const SERVER_BASE_URL = 'https://ca001094c9d258afd294.free.beeceptor.com/api/users/';

const axiosAPIClient = axios.create({
    baseURL: SERVER_BASE_URL,
    timeout: 30000,
    params: {},
    headers: new AxiosHeaders({
        cache: 'no-store',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }),
});

// error handler using interceptors
axiosAPIClient.interceptors.response.use(
    (response) => response,
    (error) => {
        alert(error.response?.data?.message ?? error.message);

        return Promise.reject(error);
    }
);

export { axiosAPIClient };
