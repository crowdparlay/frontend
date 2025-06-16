import {useUnit} from 'effector-react';

import {Discussion} from '~/widgets/discussion';

import {DiscussionEntity} from '~/entities/types';

import {Page} from '~/shared/ui';

import {$discussion} from './model';

export const DiscussionPage = () => {
  const discussion = useUnit($discussion);
  if (!discussion) return null;
  return (
    <Page className="justify-start">
      <div className="md:max-w-3xl mx-auto w-full">
        <Discussion discussion={DiscussionEntity.fromResponse(discussion)} />
      </div>
    </Page>
  );
};
