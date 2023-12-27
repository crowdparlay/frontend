import {attach, createStore, sample} from 'effector';
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

const signUpFx = attach({effect: api.apiV1UsersRegisterPost});
export const $loading = or(signUpFx.pending, sessionRequestFx.pending);

export const $form = createForm({
  fields: {
    email: {
      init: '',
      rules: [rules.required(), rules.email()],
      validateOn: ['blur'],
    },
    display_name: {
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
    confirm_password: {
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

export const $formError = createStore<string | null>(null);

sample({
  clock: $form.fields.password.changed,
  source: $form.fields.confirm_password.$isDirty,
  filter: (isConfirmDirty) => isConfirmDirty,
  target: $form.fields.confirm_password.validate,
});

sample({
  clock: anonymousRoute.closed,
  target: [$form.reset, $formError.reinit],
});

sample({
  clock: $form.formValidated,
  fn: (fields) => ({body: fields}),
  target: [signUpFx, $formError.reinit],
});

sample({
  clock: signUpFx.failData,
  filter: (res) => res.status === 'bad_request' && Boolean(res.error.validation_errors),
  fn: (res) => {
    if (res.status !== 'bad_request') {
      throw new Error();
    }
    return Object.entries(res.error.validation_errors!).map(([field, errorText]) => {
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
  clock: signUpFx.failData,
  filter: (res) => !(res.status === 'bad_request' && Boolean(res.error.validation_errors)),
  fn: (res) => {
    switch (res.status) {
      case 'bad_request':
      case 'forbidden':
      case 'internal_server_error':
        return res.error.error_description ?? 'Something went wrong. Try again later.';
      default:
        return 'Something went wrong. Try again later.';
    }
  },
  target: $formError,
});

sample({
  clock: signUpFx.doneData,
  fn: (data) => {
    console.log(data);
  },
  target: sessionRequestFx,
});
