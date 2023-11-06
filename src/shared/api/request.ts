import axios from 'axios';
import {createEffect} from 'effector';

import {API_URL} from '../config';

export const localApi = axios.create({
  baseURL: API_URL,
  validateStatus: (status) => status >= 200 && status < 300,
});

interface Request {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  params?: unknown;
}

export const requestFx = createEffect<Request, any>((request) => {
  return localApi({
    method: request.method,
    url: request.path,
    data: request.body,
    params: request.params,
  })
    .then((response) => response.data)
    .catch((response) => Promise.reject(response.response.data));
});
