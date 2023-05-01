import axios from "axios";
import { clearToken } from "../challenge_arkus/loginView/actions";
import * as Notification from '../notications/toastNotificacion'

const axiosInterceptorResponse = axios.interceptors.response.use(
    (config) => {
        return config;
    },
    (error) => {
        if (error.response.status === 401) {
            if (sessionStorage.getItem('token')) {
                sessionStorage.clear()
                window.location.href = '/login'
                clearToken();
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInterceptorResponse;
