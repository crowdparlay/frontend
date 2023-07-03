import classNames from 'classnames';
import {ButtonHTMLAttributes, FC, ReactNode, SVGProps} from 'react';

import cls from './index.module.scss';

export enum ButtonVariant {
  PRIMARY = 'primary',
  CLEAR = 'clear',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  badge?: number;
  fullWidth?: boolean;
}

export const Button = (props: ButtonProps) => {
  const {
    Icon,
    badge,
    variant = ButtonVariant.PRIMARY,
    fullWidth,
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
  };

  return (
    <button
      className={classNames(cls.button, mods, className)}
      disabled={disabled}
      type={type}
      {...otherProps}
    >
      {Icon !== undefined && <Icon />}

      <div className={cls.wrapper}>
        {children}
        {badge !== undefined && <span className={cls.badge}>{badge}</span>}
      </div>
    </button>
  );
};
