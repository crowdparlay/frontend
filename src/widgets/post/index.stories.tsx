import {Meta, StoryObj} from '@storybook/react';

import {Post} from '.';

const meta: Meta<typeof Post> = {
  title: 'widgets/Post',
  component: Post,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Post>;

const POSTS = [
  {
    id: '1',
    replyId: '-1',
    author: {
      id: '1',
      username: 'mere1y',
      displayName: 'mere1y',
      avatarUrl: 'https://avatars.githubusercontent.com/u/44271343?v=4',
    },
    date: new Date(),
    text: (
      <>
        вапо ыа вп вы аа вв ыых авпо эыж ваопы длва пды в @sdfgsdfgfsgdf ыдп рыа врп выдл арп а
        ыдлврап лыорв алпырв лаопр ыдлвао рпдлывора длрвыд алпрылаоп двыраоплырпадлвыорпдлырвдл рр
        лры вдал рпдылвр аопыдвл рпы лароп ылврпао!
      </>
    ),
    commentators: [
      {
        id: '1',
        username: 'zendet',
        displayName: 'Z E N D E T',
        avatarUrl: 'https://source.unsplash.com/random/100x100?sig=2',
      },
      {
        id: '2',
        username: 'crowdparlay',
        displayName: 'Crowd Parlay',
      },
    ],
    commentsCount: 2,
    canReport: true,
    canReply: true,
    react: 'like',
  },
  {
    id: '3',
    replyId: '-1',
    author: {
      id: '2',
      username: 'Imran',
      displayName: 'Imran',
      avatarUrl: 'https://source.unsplash.com/random/100x100?sig=2',
    },
    date: new Date(),
    text: <>Подвал</>,
    commentators: [
      {
        id: '1',
        username: 'zendet',
        displayName: 'Z E N D E T',
        avatarUrl: 'https://source.unsplash.com/random/100x100?sig=2',
      },
      {
        id: '2',
        username: 'crowdparlay',
        displayName: 'Crowd Parlay',
      },
    ],
    commentsCount: 2,
    canReport: true,
    canReply: true,
    react: 'like',
  },
  {
    id: '4',
    replyId: '-1',
    author: {
      id: '3',
      username: 'crowdparlay',
      displayName: 'Crowd Parlay',
    },
    date: new Date(),
    text: <>А всё, конец</>,
    commentators: [
      {
        id: '1',
        username: 'zendet',
        displayName: 'Z E N D E T',
        avatarUrl: 'https://source.unsplash.com/random/100x100?sig=2',
      },
      {
        id: '2',
        username: 'crowdparlay',
        displayName: 'Crowd Parlay',
      },
    ],
    commentsCount: 2,
    canReport: true,
    canReply: true,
    react: 'like',
  },
];

const renderPosts = (posts: typeof POSTS) => {
  return posts.map((post) => {
    const nextPosts = posts.slice(1, posts.length);

    return (
      // @ts-ignore
      <Post
        key={posts.length + post.id}
        {...post}
        commentators={nextPosts.map((p) => p.author)}
        commentsCount={nextPosts.length}
        canReply={Math.random() < 0.5}
        canReport={Math.random() < 0.5}
        children={nextPosts.length > 0 ? renderPosts(nextPosts) : undefined}
      />
    );
  });
};

export const Default: Story = {
  args: {
    id: '1',
    author: {
      id: '1',
      username: 'mere1y',
      displayName: 'mere1y',
      avatarUrl: 'https://avatars.githubusercontent.com/u/44271343?v=4',
    },
    date: new Date(),
    text: (
      <>
        вапо ыа вп вы аа вв ыых авпо эыж ваопы длва пды в @sdfgsdfgfsgdf ыдп рыа врп выдл арп а
        ыдлврап лыорв алпырв лаопр ыдлвао рпдлывора длрвыд алпрылаоп двыраоплырпадлвыорпдлырвдл рр
        лры вдал рпдылвр аопыдвл рпы лароп ылврпао!
      </>
    ),
    commentators: POSTS.map((p) => p.author),
    commentsCount: POSTS.length,
    canReport: true,
    canReply: true,
    children: renderPosts(POSTS),
  },
};
