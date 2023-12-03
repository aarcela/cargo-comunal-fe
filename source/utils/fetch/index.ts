import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import axiosRequest from './configAxios';

type MethodReq = 'post' | 'get' | 'put' | 'delete';

export const FetchApi = async <T = any>(
  method: MethodReq,
  url: string,
  config?: AxiosRequestConfig | any,
): Promise<{
  ok: Boolean;
  message?: string;
  data?: T;
}> => {
  const req = getMethod(method);
  const msg = 'Ha ocurrido un error, por favor intente más tarde';

  try {
    const {data} = await req<T>(url, config);
    return {
      ok: true,
      data: data,
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
    } else {
      console.log('Unknown Error:', error);
    }

    return {
      ok: false,
      message:
        (error instanceof AxiosError && error.response?.data?.data?.username) ||
        msg,
    };
  }
};

//TODO: change to FetchApi method, this solve was due to deadline and register not working properly
export const postApiRegister = async (
  url: string,
  registerData: any,
): Promise<{
  ok: Boolean;
  message?: string;
  data?: any;
}> => {
  const msg = 'Ha ocurrido un error, por favor intente más tarde';

  try {
    const {data} = await axiosRequest.post(url, registerData);
    console.log('Data axios: ', data)
    return {
      ok: true,
      data: data,
    };
  } catch (error: any) {
      if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.log('Error Axios: ', error.response?.data);
    } else {
      console.log('Unknown Error:', error);
    }

    return {
      ok: false,
      message:
        (error instanceof AxiosError && error.response?.data?.data?.username) ||
        msg,
    };
  }
};

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
};
