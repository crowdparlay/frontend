import cls from "~/widgets/post/index.module.scss";
import inlineAvatarsCls from "~/widgets/inline-avatars/index.module.scss";
import classNames from "classnames";
import {Text, TextSize} from "~/shared/ui";
import {HTMLAttributes} from "react";
import {ProfilePreview, ProfilePreviewProps} from "~/widgets/profile-preview";
import {InlineAvatars} from "~/widgets/inline-avatars";

export interface PostProps extends HTMLAttributes<HTMLDivElement> {
  author?: ProfilePreviewProps;
  replyAvatarUrls: string[];
}

export const Post = (props: PostProps) => {
  const {replyAvatarUrls, author, content, className, ...otherProps} = props;

  return (
    <div className={classNames(cls.post, className)} {...otherProps}>
      <div className={cls.content}>
        <Text size={TextSize.M}>{content}</Text>
        <ProfilePreview {...author}/>
      </div>
      <div className={cls.epilogue}>
        <InlineAvatars className={inlineAvatarsCls.avatars} avatarUrls={replyAvatarUrls}/>
        <Text size={TextSize.S}>{replyAvatarUrls.length} {replyAvatarUrls.length === 1 ? 'reply' : 'replies'}</Text>
      </div>
    </div>
  );
};
