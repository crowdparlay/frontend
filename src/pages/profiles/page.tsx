import {useUnit} from 'effector-react';
import {cn} from '~/lib/utils';

import {Profile, ProfileSkeleton} from '~/features/profile';

import {Page} from '~/shared/ui';
import {Skeleton} from '~/shared/ui/skeleton';

import * as model from './model';

export const ProfilesPage = () => {
  const [users, totalCount] = useUnit([model.$users, model.$totalCount]);
  return (
    <Page>
      <div className="flex-1 w-full mt-6 sm:max-w-xl md:max-w-3xl">
        <div className="flex w-full h-9 mb-6 justify-between items-center px-6 sm:pe-0 sm:ps-2">
          {users === 'loading' ? <Skeleton className="w-16 h-3" /> : <p>{totalCount} users</p>}
        </div>
        <div
          className={cn(
            'grid sm:grid-cols-2 md:grid-cols-3 px-3 sm:px-0 gap-3 w-full sm:max-w-xl md:max-w-3xl',
            '[&>*]:w-full [&>*]:p-3 [&>*]:rounded-xl [&>*]:border',
          )}
        >
          {users === 'loading' && [...Array(50).keys()].map((i) => <ProfileSkeleton key={i} />)}
          {users !== 'loading' &&
            users.map((user) => <Profile key={user.id} variant={'md'} user={user} />)}
        </div>
      </div>
    </Page>
  );
};
