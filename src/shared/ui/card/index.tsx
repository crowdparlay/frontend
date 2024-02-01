import classNames from 'classnames';
import {HTMLAttributes, ReactNode} from 'react';

import {ContainerSize} from '~/shared/ui';

import cls from './index.module.scss';

export enum CardSize {
  S = 's',
  M = 'm',
  L = 'l',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  size?: CardSize;
  children: ReactNode;
}

export const Card = (props: CardProps) => {
  const {size = ContainerSize.M, className, children, ...otherProps} = props;

  const mods = {
    [cls[size]]: true,
  };

  return (
    <div className={classNames(cls.card, mods, className)} {...otherProps}>
      {children}
    </div>
  );
};
