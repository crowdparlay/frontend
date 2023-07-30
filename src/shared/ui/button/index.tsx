import classNames from 'classnames';
import {ButtonHTMLAttributes, ReactNode} from 'react';

import cls from './index.module.scss';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  text?: string;
  fullWidth?: boolean;
  center?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    children,
    variant = ButtonVariant.PRIMARY,
    text,
    fullWidth,
    center = true,
    type,
    className,
    disabled,
    ...otherProps
  } = props;

  const mods = {
    [cls.equilateral]: text == undefined,
    [cls.disabled]: disabled,
    [cls[variant]]: true,
    [cls.fullWidth]: fullWidth,
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
      {text}
    </button>
  );
};
