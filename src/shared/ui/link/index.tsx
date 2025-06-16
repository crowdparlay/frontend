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
  };

  const activeMods = {
    [cls.active]: variant === LinkVariant.NAVIGATION,
  };

  return (
    <AtomicLink
      to={to}
      className={classNames(
        cls.link,
        mods,
        className,
        'text-foreground hover:text-muted-foreground',
      )}
      activeClassName={classNames(cls.link, mods, activeMods, activeClassName)}
      {...otherProps}
    >
      {Icon && <Icon />}

      <div className={cls.wrapper}>
        {children}
        {badge !== undefined && (
          <Badge className="absolute rounded-full px-[0.3rem] py-0.5 border-2 border-background leading-none bottom-[-0.6rem] right-[-0.8rem]">
            {badge}
          </Badge>
        )}
      </div>
    </AtomicLink>
  );
};
