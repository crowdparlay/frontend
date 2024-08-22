import {querySync, RouteInstance} from 'atomic-router';
import {combine, createEvent, restore, Store} from 'effector';

import {controls} from '~/shared/routes';

interface PaginationFactoryParams {
  route: RouteInstance<any>;
  totalCount: Store<number>;
  limit: Store<number> | number;
}

export const paginationFactory = (params: PaginationFactoryParams) => {
  const pageChanged = createEvent<number>();

  const $pageQuery = restore(pageChanged.map(String), '1');

  const $page = $pageQuery.map(Number);

  const $limit = combine({limit: params.limit}).map(({limit}) => limit);

  const $totalCount = combine({totalCount: params.totalCount}).map(({totalCount}) => totalCount);

  const $totalPageCount = combine($totalCount, $limit, (totalCount, limit) =>
    Math.ceil(totalCount / limit),
  );

  const $offset = combine($page, $limit, (page, limit) => (page - 1) * limit);

  querySync({
    route: params.route,
    source: {page: $pageQuery},
    controls,
  });

  return {
    pageChanged,
    $page,
    $totalPageCount,
    $offset,
    $limit,
  };
};
