import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { user, logOutUser } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            const reqInterceptors = axiosSecure.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${user?.accessToken}`;
                return config;
            })
            const resInterceptors = axiosSecure.interceptors.response.use((response) => {
                return response
            }, (error) => {
                const statusCode = error.status;
                if (statusCode === 401 || statusCode === 403) {
                    logOutUser()
                        .then(() => {
                            navigate('/login')
                        })
                }
                return Promise.reject(error);
            })
            return () => {
                axiosSecure.interceptors.request.eject(reqInterceptors);
                axiosSecure.interceptors.response.eject(resInterceptors);
            }
        }
    }, [user, logOutUser, navigate])
    return axiosSecure;
};

export default useAxiosSecure;