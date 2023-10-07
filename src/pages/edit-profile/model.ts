import {createEvent, sample} from 'effector';
import {createForm} from 'effector-forms';

import {routes} from '~/shared/routes';
import {rules} from '~/shared/rules';
import {chainAuthorized} from '~/shared/session';

import {b64toBlob} from './lib';

export const currentRoute = routes.editProfile;
export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

export const $form = createForm({
  fields: {
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
    newPassword: {
      init: '',
      rules: [
        rules.required(),
        rules.minLength(4),
        {
          name: 'passwords-not-equal',
          validator: (value: string, {password}: any) => ({
            isValid: value !== password,
            errorText: 'New password equal to current password',
          }),
        },
      ],
    },
    avatarUrl: {
      init: '',
    },
  },
  validateOn: ['submit'],
});

export const avatarFileChanged = createEvent<string>();

sample({
  clock: avatarFileChanged,
  fn: (data) => {
    const blob = b64toBlob(data);
    const blobUrl = URL.createObjectURL(blob);
    console.log(blobUrl);

    return blobUrl;
  },
  target: $form.fields.avatarUrl.set,
});

// eslint-disable-next-line effector/no-useless-methods
sample({
  clock: $form.formValidated,
  fn: () => {
    alert('Save settings on server');
  },
});
