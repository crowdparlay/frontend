import classNames from 'classnames';
import {AnchorHTMLAttributes, FC, SVGProps} from 'react';

import {Badge} from '../badge';
import cls from './index.module.scss';

export interface ComponentProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  disabled?: boolean;
  to?: string | any;
}

export enum LinkVariant {
  PRIMARY = 'primary',
  RAW = 'raw',
  CLEAR = 'clear',
  NAVIGATION = 'navigation',
}

export interface LinkProps extends ComponentProps {
  active?: boolean;
  variant?: LinkVariant;
  Component?: FC<ComponentProps>;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  badge?: number;
  fullWidth?: boolean;
  center?: boolean;
}

export const Link = (props: LinkProps) => {
  const {
    variant = LinkVariant.RAW,
    Icon,
    Component,
    to,
    fullWidth,
    center,
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
    [cls.fullWidth]: fullWidth,
    [cls.center]: center,
  };

  if (Component) {
    return (
      <Component
        to={to}
        disabled={disabled}
        aria-disabled={disabled}
        className={classNames(cls.link, mods, className)}
        {...otherProps}
      >
        {Icon !== undefined && <Icon />}

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
      {Icon !== undefined && <Icon />}

      <div className={cls.wrapper}>
        {children}
        {badge !== undefined && <Badge>{badge}</Badge>}
        {variant === LinkVariant.NAVIGATION && active && <div className={cls.active} />}
      </div>
    </a>
  );
};
