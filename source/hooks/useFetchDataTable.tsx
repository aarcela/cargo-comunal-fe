import { useEffect, useState, useRef } from 'react';
import { FetchApi } from '../utils';


interface Pagination{
    numPage : number;
    resultPage: number;
    totalResult: number;
}

export const useFetchDataTable= <T extends any>(url: string, params?: object) => {
    const urlApi = useRef(url)
    const [data, setData] = useState<T[]>([]);
    const [loandingFetch, setLoandingFetch] = useState(false);
    const [msgError, setMsgError] = useState<string>();
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPage, setNextPage] = useState(1);

    useEffect(() => {
      
        fetchGet(params);

    }, [])


    

    const fetchGet = async(params?: object) => {
        setLoandingFetch(true);
        let urlFetch = urlApi.current;
        /*if( params != undefined ){
            urlFetch = urlFetch + '?';
           
            for (const key in params) {
                if (Object.prototype.hasOwnProperty.call(params, key)) {
                    urlFetch = urlFetch + `${key}=${params}`;
                }
                
            }

            
        }*/

        const { ok, message, data } = await FetchApi<{ data: T[], pagination: Pagination }>('get', urlFetch, { params: params });
        if( ok && data ){   
            const { pagination:{ numPage, resultPage, totalResult } } = data;

            setCurrentPage(numPage);
            setNextPage(calcNextPage(totalResult, resultPage));
                
            setData(values => ([...values, ...data.data]));

        }

        setLoandingFetch(false);

        if( !ok && message ){
            setMsgError(message);
        }

    }

    const filter = (params: object) => {
        setData([]);
        fetchGet(params);
    }

    const getNextData = (params?: object) => {
        if( currentPage !== nextPage ){
            
            fetchGet({page: nextPage, ...params});
        }
    }

    const onRefresh = (params?: object) => {
        fetchGet({page: currentPage, ...params});
    }

    const calcNextPage = (totalResult: number, resultPage:number) => {
        const totalPages = Math.ceil(totalResult/resultPage);
        let auxNextPage = nextPage;

        for (let index = currentPage; index <= totalPages + 1; index++) {
            auxNextPage = index + 1;

            break;
        }

        return auxNextPage;
    }

    return {
        data,
        loandingFetch,
        msgError,
        setMsgError,
        filter,
        getNextData,
        onRefresh
    }
}
