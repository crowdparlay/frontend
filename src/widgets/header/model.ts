import {createEvent, createStore} from 'effector';

export const searchChange = createEvent<string>();
export const $search = createStore<string>('').on(searchChange, (_, payload) => payload);
