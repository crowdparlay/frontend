import {createEffect} from 'effector';
import {decodeToken} from 'react-jwt';

import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from '../config';
import {requestFx} from './request';
import {JwtPayload, User} from './types';

export const getSessionFx = createEffect<void, User>(() => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  if (!accessToken) {
    throw new Error('Access token is required');
  }

  const jwtPayload = decodeToken<JwtPayload>(accessToken);
  if (!jwtPayload) {
    throw new Error('Jwt payload is empty');
  }

  return requestFx({
    method: 'GET',
    path: `/api/users/${jwtPayload.sub}`,
  });
});
