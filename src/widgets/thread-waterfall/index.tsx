import classNames from 'classnames';
import {HTMLAttributes, useState} from 'react';
import StackGrid, {Grid} from 'react-stack-grid';
import {Waypoint} from 'react-waypoint';

import {Thread, ThreadProps} from '~/features/thread';

import cls from './index.module.scss';

export type ThreadWaterfallProps = HTMLAttributes<HTMLDivElement>;

export const ThreadWaterfall = (props: ThreadWaterfallProps) => {
  const {className, ...otherProps} = props;

  const [threads, setThreads] = useState<ThreadProps[]>([]);
  const [gridRef, setGridRef] = useState<Grid>();

  const createThread = (): ThreadProps => {
    const text = [...Array(Math.floor(Math.random() * 4 + 1))]
      .map(
        () =>
          'не будем ломать уютненький манямирок лактозного пивозавра м м м что вчера было завтра',
      )
      .join(' ');

    return {
      text,
      author: {
        username: 'zendet',
        displayName: 'zendet',
        avatarUrl: 'https://i.imgur.com/xGN9UzF.png',
      },
      replyCount: 2,
      replyAuthors: [
        {
          username: 'zendet',
          displayName: 'Z E N D E T',
        },
        {
          username: 'zendet',
          displayName: 'Z E N D E T',
          avatarUrl: 'https://i.imgur.com/xGN9UzF.png',
        },
      ],
      onExpanded: () => setInterval(() => gridRef?.updateLayout()),
    };
  };

  const appendMoreThreads = () => {
    setThreads([...threads, createThread(), createThread(), createThread()]);
  };

  return (
    <StackGrid
      gridRef={(grid) => setGridRef(grid)}
      duration={100}
      columnWidth={400}
      gutterWidth={12}
      gutterHeight={12}
      className={classNames(cls.threadWaterfall, className)}
      {...otherProps}
    >
      {...threads.map((props) => <Thread {...props} />)}
      <Waypoint onEnter={appendMoreThreads} />
    </StackGrid>
  );
};
