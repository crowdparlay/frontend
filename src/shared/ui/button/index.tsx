import classNames from 'classnames';
import {ButtonHTMLAttributes, ReactNode} from 'react';

import cls from './index.module.scss';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INLINE = 'inline',
}

export enum ButtonShape {
  DEFAULT = 'default',
  FULL_WIDTH = 'fullWidth',
  EQUILATERAL = 'equilateral',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  center?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    variant = ButtonVariant.PRIMARY,
    shape = ButtonShape.DEFAULT,
    center = true,
    type,
    className,
    disabled,
    ...otherProps
  } = props;

  const mods = {
    [cls.disabled]: disabled,
    [cls[variant]]: true,
    [cls[shape]]: true,
    [cls.center]: center,
  };

  return (
    <button
      className={classNames(cls.button, mods, className)}
      disabled={disabled}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
};
