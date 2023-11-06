import {attach} from 'effector';
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
  fn: (data) => {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, data.body.access_token);
    localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, data.body.refresh_token);
  },
  target: sessionRequestFx,
});
