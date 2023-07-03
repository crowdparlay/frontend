import classNames from 'classnames';
import {AnchorHTMLAttributes, FC} from 'react';

import {Badge} from '../badge';
import cls from './index.module.scss';

export interface ComponentProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  to: string | any;
}

export enum LinkVariant {
  PRIMARY = 'primary',
  CLEAR = 'clear',
  NAVIGATION = 'navigation',
}

export interface LinkProps extends ComponentProps {
  active?: boolean;
  variant?: LinkVariant;
  Component?: FC<ComponentProps>;
  badge?: number;
  fullWidth?: boolean;
}

export const Link = (props: LinkProps) => {
  const {
    variant = LinkVariant.PRIMARY,
    Component,
    to,
    active,
    badge,
    disabled,
    className,
    children,
    ...otherProps
  } = props;

  const mods = {
    [cls[variant]]: true,
    [cls.disabled]: disabled,
  };

  if (variant === LinkVariant.NAVIGATION && !active) {
    throw new Error('Use LinkVariant.NAVIGATION to set active');
  }

  if (Component) {
    return (
      <Component
        to={to}
        disabled={disabled}
        aria-disabled={disabled}
        className={classNames(cls.link, mods, className)}
        {...otherProps}
      >
        <div className={cls.wrapper}>
          {children}
          {badge !== undefined && <Badge>{badge}</Badge>}
          {active && <div className={cls.active} />}
        </div>
      </Component>
    );
  }

  return (
    <a
      href={to}
      aria-disabled={disabled}
      className={classNames(cls.link, mods, className)}
      {...otherProps}
    >
      <div className={cls.wrapper}>
        {children}
        {badge !== undefined && <Badge>{badge}</Badge>}
        {active && <div className={cls.active} />}
      </div>
    </a>
  );
};
