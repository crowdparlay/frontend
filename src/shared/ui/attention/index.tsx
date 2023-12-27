import classNames from 'classnames';
import {ObjectHTMLAttributes} from 'react';

import cls from './index.module.scss';

export enum AttentionVariant {
  ERROR = 'error',
}

export interface AttentionProps extends ObjectHTMLAttributes<HTMLDivElement> {
  variant?: AttentionVariant;
}

export const Attention = (props: AttentionProps) => {
  const {variant = AttentionVariant.ERROR, className, children, ...otherProps} = props;

  const mods = {
    [cls[variant]]: true,
  };

  return (
    <div className={classNames(cls.attention, mods, className)} {...otherProps}>
      <span>{children}</span>
    </div>
  );
};
