import axios, { AxiosError, AxiosRequestConfig } from "axios";
import axiosRequest from "./configAxios";

type MethodReq = 'post' | 'get' | 'put' | 'delete';

export const FetchApi = async<T = any>(
        method: MethodReq, 
        url: string,
        config?: AxiosRequestConfig | any
    ) : Promise<{ok: Boolean, message?: string, data?: T}> => {
        const req = getMethod(method);
        const msg = 'Ha ocurrido un error, por favor intente más tarde';

        try {
            
            const { data } = await req<T>(url, config);

            return{
                ok: true,
                data
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                console.log("Axios Error:", axiosError.message);
                console.log("Axios Error Response:", axiosError.response);
                console.log("Axios Error Request Config:", axiosError.config);
            } else {
                console.log("Unknown Error:", error);
            }

            return{
                ok: false, 
                message: error instanceof AxiosError &&  error.response?.data?.message || msg
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