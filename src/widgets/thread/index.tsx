import cls from './index.module.scss';
import inlineAvatarsCls from '../inline-avatars/index.module.scss';
import classNames from 'classnames';
import {Text, TextSize} from '~/shared/ui';
import {HTMLAttributes, useState} from 'react';
import {ProfilePreview, ProfilePreviewProps} from '../profile-preview';
import {InlineAvatars} from '../inline-avatars';

export interface ThreadProps extends HTMLAttributes<HTMLDivElement> {
  author?: ProfilePreviewProps;
  replyAvatarUrls: string[];
}

export const Thread = (props: ThreadProps) => {
  const {author, replyAvatarUrls, content, className, ...otherProps} = props;

  const [repliesExpanded, setRepliesExpanded] = useState(false);
  const [replyThreads, setReplyThreads] = useState<ThreadProps[]>([]);

  const expandReplies = () => {
    // TODO: fetch replies
    setReplyThreads([])

    setRepliesExpanded(true);
  }

  return (
    <div className={classNames(cls.thread, className)} {...otherProps}>
      <div className={cls.post}>
        <div className={cls.content}>
          <Text size={TextSize.M}>{content}</Text>
          <ProfilePreview {...author}/>
        </div>
        {
          !repliesExpanded &&
          <div className={cls.epilogue} onClick={expandReplies}>
            <InlineAvatars className={inlineAvatarsCls.avatars} avatarUrls={replyAvatarUrls}/>
            <Text size={TextSize.S}>{replyAvatarUrls.length} {replyAvatarUrls.length === 1 ? 'reply' : 'replies'}</Text>
          </div>
        }
      </div>
      {
        repliesExpanded &&
        replyThreads.map(replyThread =>
          <div>
            <div className={cls.connector}/>
            <Thread {...replyThread}/>
          </div>
        )
      }
    </div>
  );
};
