import classNames from 'classnames';
import {HTMLAttributes, ReactNode} from 'react';

import cls from './index.module.scss';

export enum ContainerSize {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: ContainerSize;
  children: ReactNode;
}

export const Container = (props: ContainerProps) => {
  const {size = ContainerSize.L, className, children, ...otherProps} = props;

  const mods = {
    [cls[size]]: true,
  };

  return (
    <div className={classNames(cls.container, mods, className)} {...otherProps}>
      {children}
    </div>
  );
};
