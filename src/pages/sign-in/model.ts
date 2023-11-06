import {attach} from 'effector';
import {sample} from 'effector';
import {createForm} from 'effector-forms';
import {or} from 'patronum';
import {decodeToken} from 'react-jwt';

import * as api from '~/shared/api';
import {ApiV1UsersUserIdGet} from '~/shared/api';
import {JwtPayload} from '~/shared/api/types';
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY} from '~/shared/config';
import {routes} from '~/shared/routes';
import {rules} from '~/shared/rules';
import {chainAnonymous, sessionRequestFx} from '~/shared/session';

export const currentRoute = routes.auth.signIn;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.explore.open,
});

const signInFx = attach({effect: api.signInFx});
export const $loading = or(signInFx.pending, sessionRequestFx.pending);

export const $form = createForm({
  fields: {
    username: {
      init: '',
      rules: [rules.required()],
      validateOn: ['blur'],
    },
    password: {
      init: '',
      rules: [rules.required(), rules.minLength(4)],
      validateOn: ['blur'],
    },
  },
  validateOn: ['submit'],
});

sample({
  clock: anonymousRoute.closed,
  target: $form.reset,
});

sample({
  clock: $form.formValidated,
  target: signInFx,
});

sample({
  clock: signInFx.doneData,
  fn: (data: any): ApiV1UsersUserIdGet => {
    let userId: string = '';

    if (data.access_token) {
      localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.access_token);
      const jwtPayload = decodeToken<JwtPayload>(data.access_token);
      if (jwtPayload) {
        userId = jwtPayload.sub;
      }
    }

    return {
      path: {
        userId,
      },
    };
  },
  target: sessionRequestFx,
});
