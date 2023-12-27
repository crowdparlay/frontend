import {attach, createStore} from 'effector';
import {sample} from 'effector';
import {createForm} from 'effector-forms';
import {or} from 'patronum';

import * as api from '~/shared/api';
import {LOCAL_STORAGE_ACCESS_TOKEN_KEY, LOCAL_STORAGE_REFRESH_TOKEN_KEY} from '~/shared/config';
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

export const $formError = createStore<string | null>(null);

sample({
  clock: anonymousRoute.closed,
  target: [$form.reset, $formError.reinit],
});

sample({
  clock: $form.formValidated,
  target: [signInFx, $formError.reinit],
});

sample({
  clock: signInFx.doneData,
  filter: (res) => res.status >= 300 && res.status === 400 && Boolean(res.body.validation_errors),
  fn: (res) => {
    return Object.entries(res.body.validation_errors!).map(([field, errorText]) => {
      return {
        field,
        rule: 'backend',
        errorText: errorText as string,
      };
    });
  },
  target: $form.addErrors,
});

sample({
  clock: signInFx.doneData,
  filter: (res) =>
    res.status >= 300 && !(res.status === 400 && Boolean(res.body.validation_errors)),
  fn: (res) => {
    return res.body.error_description ?? 'Something went wrong. Try again later.';
  },
  target: $formError,
});

sample({
  clock: signInFx.doneData,
  filter: (res) => res.status < 300,
  fn: (data) => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.body.access_token);
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, data.body.refresh_token);
  },
  target: sessionRequestFx,
});
