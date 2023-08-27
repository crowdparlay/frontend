import classNames from 'classnames';

import cls from './index.module.scss';
import {HTMLAttributes, ReactNode, useState} from 'react';
import StackGrid, {Grid} from 'react-stack-grid';
import {Thread} from '~/features/thread';
import {Waypoint} from 'react-waypoint';

export const ThreadWaterfall = (props: HTMLAttributes<HTMLDivElement>) => {
  const {className, ...otherProps} = props;

  const [threads, setThreads] = useState<ReactNode[]>([])
  const [gridRef, setGridRef] = useState<Grid>();

  const createThread = () => {
    const content = [...Array(Math.floor(Math.random() * 4 + 1))]
      .map(() => 'не будем ломать уютненький манямирок лактозного пивозавра м м м что вчера было завтра')
      .join(' ')

    return (
      <Thread
        content={content}
        author={{
          username: 'zendet',
          displayName: 'zendet',
          avatarUrl: 'https://i.imgur.com/xGN9UzF.png',
          verified: false,
        }}
        replyCount={2}
        repliers={[
          {
            username: 'zendet',
            displayName: 'Z E N D E T',
          },
          {
            username: 'zendet',
            displayName: 'Z E N D E T',
            avatarUrl: 'https://i.imgur.com/xGN9UzF.png',
          },
        ]}
        onExpanded={() => setInterval(() => gridRef?.updateLayout())}
      />
    );
  };

  const appendMoreThreads = () => {
    console.log('FETCH NEW POST');
    setThreads([...threads, createThread()])
    setThreads([...threads, createThread()])
    setThreads([...threads, createThread()])
  }


  return (
    <StackGrid
      gridRef={grid => setGridRef(grid)}
      duration={0} columnWidth={400} gutterWidth={12} gutterHeight={12}
      className={classNames(cls.threadWaterfall, className)} {...otherProps}>
      {...threads}
      <Waypoint onEnter={appendMoreThreads}/>
    </StackGrid>
  );
};
