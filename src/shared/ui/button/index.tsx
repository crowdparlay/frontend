import classNames from 'classnames';
import {ButtonHTMLAttributes, FC, ReactNode, SVGProps} from 'react';

import {Badge} from '../badge';
import cls from './index.module.scss';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  CLEAR = 'clear',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  badge?: number;
  fullWidth?: boolean;
  center?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    Icon,
    badge,
    variant = ButtonVariant.PRIMARY,
    fullWidth,
    center,
    children,
    type,
    className,
    disabled,
    ...otherProps
  } = props;

  const mods = {
    [cls.disabled]: disabled,
    [cls[variant]]: true,
    [cls.fullWidth]: fullWidth,
    [cls.center]: center,
  };

  return (
    <button
      className={classNames(cls.button, mods, className, children === undefined && cls.singleIcon)}
      disabled={disabled}
      type={type}
      {...otherProps}
    >
      {Icon !== undefined && <Icon/>}

      {
        children !== undefined &&
        <div className={cls.wrapper}>
          {children}
          {badge !== undefined && <Badge>{badge}</Badge>}
        </div>
      }
    </button>
  );
};
