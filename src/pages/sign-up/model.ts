import {attach, sample} from 'effector';
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

export const currentRoute = routes.auth.signUp;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.explore.open,
});

const signUpFx = attach({effect: api.apiV1UsersRegisterPost});
export const $loading = or(signUpFx.pending, sessionRequestFx.pending);

export const $form = createForm({
  fields: {
    email: {
      init: '',
      rules: [rules.required(), rules.email()],
      validateOn: ['blur'],
    },
    displayName: {
      init: '',
      rules: [rules.required(), rules.minLength(4)],
      validateOn: ['blur'],
    },
    username: {
      init: '',
      rules: [rules.required(), rules.minLength(4)],
      validateOn: ['blur'],
    },
    password: {
      init: '',
      rules: [rules.required(), rules.minLength(4)],
      validateOn: ['blur'],
    },
    confirm: {
      init: '',
      rules: [
        rules.required(),
        {
          name: 'passwords-equal',
          validator: (value: string, {password}: any) => ({
            isValid: value === password,
            errorText: 'Confirm password not equal to password',
          }),
        },
      ],
      validateOn: ['change'],
    },
  },
  validateOn: ['submit'],
});

sample({
  clock: $form.fields.password.changed,
  source: $form.fields.confirm.$isDirty,
  filter: (isConfirmDirty) => isConfirmDirty,
  target: $form.fields.confirm.validate,
});

sample({
  clock: anonymousRoute.closed,
  target: $form.reset,
});

sample({
  clock: $form.formValidated,
  fn: (fields) => ({body: fields}),
  target: signUpFx,
});

sample({
  clock: signUpFx.doneData,
  fn: (): ApiV1UsersUserIdGet => {
    let userId: string = '';

    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    if (accessToken) {
      const jwtPayload = decodeToken<JwtPayload>(accessToken);
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
