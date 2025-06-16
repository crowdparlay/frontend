import {useUnit} from 'effector-react';
import {Plus} from 'lucide-react';

import {CreateDiscussionDialog} from '~/widgets/create-discussion-dialog';
import {Discussion, DiscussionSkeleton} from '~/widgets/discussion';

import {DiscussionEntity} from '~/entities/types';

import {Page} from '~/shared/ui';
import {Button} from '~/shared/ui/button';
import {Skeleton} from '~/shared/ui/skeleton';

import {$discussions, $totalCount} from './model';

export const ExplorePage = () => {
  const [discussions, totalCount] = useUnit([$discussions, $totalCount]);
  return (
    <Page className="mx-auto w-full pt-16 pb-48">
      <div className="flex-1 w-full mt-6 sm:max-w-xl md:max-w-3xl">
        <div className="flex w-full mb-6 justify-between items-center px-6 sm:px-0 sm:ps-2">
          {discussions === 'loading' ? (
            <Skeleton className="w-24 h-3" />
          ) : (
            <p>{totalCount} discussions</p>
          )}
          <CreateDiscussionDialog>
            <Button className="rounded-full">
              <Plus />
              <span>New discussion</span>
            </Button>
          </CreateDiscussionDialog>
        </div>
        <div className="sm:space-y-6 sm:mb-6">
          {discussions === 'loading' &&
            [...Array(5).keys()].map((i) => <DiscussionSkeleton key={i} />)}
          {discussions !== 'loading' &&
            discussions.map((discussion) => (
              <Discussion
                key={discussion.id}
                className="rounded-none sm:rounded-xl border-x-0 border-b-0 border-t sm:border"
                discussion={DiscussionEntity.fromResponse(discussion)}
                preview={true}
              />
            ))}
        </div>
      </div>
    </Page>
  );
};
