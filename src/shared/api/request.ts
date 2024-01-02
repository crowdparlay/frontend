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
  query?: unknown;
}

export const requestFx = createEffect<Request, any>((request) => {
  return localApi({
    method: request.method,
    url: request.path,
    data: request.body,
    params: request.query,
  })
    .then((response) => ({status: response.status, body: response.data}))
    .catch((response) =>
      Promise.resolve({status: response.response.status, body: response.response.data}),
    );
});
