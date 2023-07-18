import classNames from 'classnames';
import {ReactNode} from 'react';

import cls from './index.module.scss';

export interface PageProps {
  className?: string;
  children: ReactNode;
}

export const Page = (props: PageProps) => {
  const {className, children} = props;

  return <main className={classNames(cls.page, className)}>{children}</main>;
};
