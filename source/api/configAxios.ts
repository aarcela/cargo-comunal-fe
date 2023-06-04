import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { API_URL } from "@env";


const axiosRequest = axios.create({
    baseURL: API_URL || 'https://cargocomunal-app.ga/api'
});

axiosRequest.interceptors.request.use(
    async(config : InternalAxiosRequestConfig) => {
        const token = await AsyncStorage.getItem('token');
        
        if ( token ) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    }
);

export default axiosRequest;
