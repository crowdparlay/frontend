import classNames from 'classnames';
import {ButtonHTMLAttributes, ReactNode} from 'react';

import cls from './index.module.scss';

export enum ButtonVariant {
  PRIMARY = 'primary',
  CLEAR = 'clear',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    variant = ButtonVariant.PRIMARY,
    fullWidth,
    children,
    type = 'button',
    className,
    disabled,
    ...otherProps
  } = props;

  const mods = {
    [cls.disabled]: disabled,
    [cls[variant]]: true,
    [cls.fullWidth]: fullWidth,
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
