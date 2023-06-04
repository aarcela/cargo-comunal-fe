import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import axiosRequest from "./configAxios";

type MethodReq = 'post' | 'get' | 'put' | 'delete';

export const FetchApi= async<T = any>(
        method: MethodReq, 
        url: string,
        config?: AxiosRequestConfig
    ) : Promise<{ok: Boolean, message?: string, data?: T}> => {
        
        const req = getMethod(method);
        const msg = 'Ha ocurrido un error';

        try {
            
            const { data } = await req<T>(url, config);

            return{
                ok: true,
                data
            }
        } catch (error: unknown) {
            
            return{
                ok: false, 
                message: error instanceof AxiosError && error.message || msg
            }
        }
}

const getMethod = (method: MethodReq) => {
    switch (method) {
        case 'post':
            return axiosRequest.post;
        case 'put':
            return axiosRequest.put;
        case 'delete':
                return axiosRequest.delete;
        default:
            return axiosRequest.get;
    }
}