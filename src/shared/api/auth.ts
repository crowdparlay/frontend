import axios from 'axios';
import {createEffect} from 'effector';

import {LOCAL_STORAGE_ACCESS_TOKEN_KEY, LOCAL_STORAGE_REFRESH_TOKEN_KEY} from '../config';
import {localApi, requestFx} from './request';
import {User} from './types';

export interface ConnectTokenResponse {
  access_token: string;
  refresh_token: string;
}

localApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)}`;
  return config;
});

localApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        throw error;
      }

      const {data} = await axios.post<ConnectTokenResponse>('/connect/token', {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        scope: 'offline_access',
      });

      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.access_token);
      localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, data.refresh_token);

      return localApi.request(originalRequest);
    }

    throw error;
  },
);

export interface SignIn {
  username: string;
  password: string;
}

export const signInFx = createEffect<SignIn, void>((form) => {
  return requestFx({
    method: 'POST',
    path: '/connect/token',
    body: {
      grant_type: 'password',
      scope: 'offline_access',
      ...form,
    },
  });
});

export interface SignUp extends SignIn {
  displayName: string;
}

export const signUpFx = createEffect<SignUp, User>((form) => {
  return requestFx({
    method: 'POST',
    path: '/api/users/register',
    body: form,
  });
});

export const logoutFx = createEffect<void, void>(() => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
});
