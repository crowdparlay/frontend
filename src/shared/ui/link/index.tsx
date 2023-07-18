import {RouteParams} from 'atomic-router';
import {Link as AtomicLink, LinkProps as AtomicLinkProps} from 'atomic-router-react';
import classNames from 'classnames';
import {FC, SVGProps} from 'react';

import {Badge} from '../badge';
import cls from './index.module.scss';

export enum LinkVariant {
  PRIMARY = 'primary',
  RAW = 'raw',
  CLEAR = 'clear',
  NAVIGATION = 'navigation',
}

export interface LinkProps extends AtomicLinkProps<RouteParams> {
  forceActive?: boolean;
  variant?: LinkVariant;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  badge?: number;
  fullWidth?: boolean;
  center?: boolean;
}

export const Link = (props: LinkProps) => {
  const {
    variant = LinkVariant.RAW,
    Icon,
    to,
    fullWidth,
    center,
    forceActive,
    badge,
    className,
    activeClassName,
    children,
    ...otherProps
  } = props;

  const mods = {
    [cls[variant]]: true,
    [cls.fullWidth]: fullWidth,
    [cls.center]: center,
    [cls.active]: forceActive,
  };

  const activeMods = {
    [cls.active]: variant === LinkVariant.NAVIGATION,
  };

  return (
    <AtomicLink
      to={to}
      className={classNames(cls.link, mods, className)}
      activeClassName={classNames(cls.link, mods, activeMods, activeClassName)}
      {...otherProps}
    >
      {Icon !== undefined && <Icon />}

      <div className={cls.wrapper}>
        {children}
        {badge !== undefined && <Badge>{badge}</Badge>}

        <div className={cls.activeLine} />
      </div>
    </AtomicLink>
  );
};
