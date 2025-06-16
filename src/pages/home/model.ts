import {createStore, sample} from 'effector';
import {createEffect} from 'effector/compat';
import {sortBy} from 'lodash';

import {routes} from '~/shared/routes';

export const currentRoute = routes.home;

export interface Repo {
  id: number;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  pushed_at: string;
  language: string;
  topics: string[];
  owner: {
    id: string;
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

const fetchReposFx = createEffect(async (): Promise<Repo[]> => {
  const response = await fetch('https://api.github.com/orgs/crowdparlay/repos');
  return await response.json();
});

export const $repos = createStore<Repo[]>([]);

sample({
  clock: currentRoute.opened,
  target: fetchReposFx,
});

sample({
  clock: fetchReposFx.doneData,
  fn: (repos) => sortBy(repos, (repo) => -new Date(repo.pushed_at)),
  target: $repos,
});
