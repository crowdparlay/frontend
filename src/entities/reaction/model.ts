import {restore} from 'effector';

import {apiV1LookupReactionsGetFx} from '~/shared/api';

export const $availableReactions = restore(
  apiV1LookupReactionsGetFx.doneData.map((payload) => payload.answer),
  [],
);
