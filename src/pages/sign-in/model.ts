import {attach, createEvent, createStore} from 'effector';
import {createEffect, sample} from 'effector';
import {createForm} from 'effector-forms';
import {combineEvents, or} from 'patronum';

import * as api from '~/shared/api';
import {ApiV1AuthenticationSignInPost, ApiV1AuthenticationSsoGoogleGet} from '~/shared/api';
import {router, routes} from '~/shared/routes';
import {rules} from '~/shared/rules';
import {chainAnonymous, sessionRequestFx} from '~/shared/session';

export const currentRoute = routes.auth.signIn;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.explore.open,
});

const signInFx = attach({effect: api.apiV1AuthenticationSignInPostFx});
const signInWithGoogleFx = attach({effect: api.apiV1AuthenticationSsoGoogleGetFx});
const navigateToUrlFx = createEffect((url: string) => {
  console.log({url});
  router.push({path: url, params: {}, query: {}, method: 'replace'});
});

export const signInWithGoogleClicked = createEvent();

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
  fn: (payload): ApiV1AuthenticationSignInPost => ({
    body: {
      usernameOrEmail: payload.username,
      password: payload.password,
    },
  }),
  target: [signInFx, $formError.reinit],
});

sample({
  clock: signInFx.failData,
  fn: (res) => {
    if ('error_description' in res.error) {
      return res.error.error_description!;
    }
    return 'Something went wrong. Try again later.';
  },
  target: $formError,
});

sample({
  clock: signInFx.doneData,
  source: currentRoute.$query,
  // filter: (query) => query.returnUrl === undefined,
  target: sessionRequestFx,
});

sample({
  clock: combineEvents({events: [signInFx.doneData, sessionRequestFx.doneData]}),
  source: currentRoute.$query,
  filter: (query) => query.returnUrl !== undefined,
  fn: (query) => query.returnUrl!,
  target: navigateToUrlFx,
});

sample({
  clock: signInWithGoogleClicked,
  source: currentRoute.$query,
  fn: (state): ApiV1AuthenticationSsoGoogleGet => ({
    query: {
      returnUrl: state.returnUrl ?? window.location.href,
    },
  }),
  target: signInWithGoogleFx,
});
