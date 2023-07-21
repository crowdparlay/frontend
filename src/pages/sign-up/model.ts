import {attach, sample} from 'effector';
import {createForm} from 'effector-forms';
import {or} from 'patronum';

import * as api from '~/shared/api';
import {routes} from '~/shared/routes';
import {rules} from '~/shared/rules';
import {chainAnonymous, sessionRequestFx} from '~/shared/session';

export const currentRoute = routes.auth.signUp;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.explore.open,
});

const signUpFx = attach({effect: api.signUpFx});
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
  clock: anonymousRoute.closed,
  target: $form.reset,
});

sample({
  clock: $form.formValidated,
  target: signUpFx,
});

sample({
  clock: signUpFx.doneData,
  target: sessionRequestFx,
});
