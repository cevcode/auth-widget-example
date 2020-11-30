import axios, { AxiosResponse } from 'axios';
import { RequestTypes } from 'models/RequestTypes';

function request<T>(requestType: RequestTypes, url: string, params?: any): Promise<AxiosResponse<T>> {
    return axios[requestType](url, { 'Content-Type': 'application/xml; charset=utf-8', ...params });
}

export { request };
