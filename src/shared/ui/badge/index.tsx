import classNames from 'classnames';
import {HTMLAttributes} from 'react';

import cls from './index.module.scss';

export type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export const Badge = (props: BadgeProps) => {
  const {children, className, ...otherProps} = props;

  return (
    <span className={classNames(cls.badge, className)} {...otherProps}>
      {children}
    </span>
  );
};
