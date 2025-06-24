import {RouteInstance, RouteParams, RouteQuery} from 'atomic-router';
import {Link as AtomicLink} from 'atomic-router-react';
import React from 'react';
import {cn} from '~/lib/utils';

export const Link = <Params extends RouteParams>({
  className,
  children,
  ...otherProps
}: {
  to: string | RouteInstance<Params>;
  params?: Params | undefined;
  query?: RouteQuery | undefined;
  className?: string | undefined;
  activeClassName?: string | undefined;
  inactiveClassName?: string | undefined;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    ref?: React.ForwardedRef<HTMLAnchorElement> | undefined;
  }) => (
  <AtomicLink
    className={cn(
      'w-fit text-muted-foreground hover:text-foreground underline-offset-4 hover:underline transition-all duration-100',
      className,
    )}
    {...otherProps}
  >
    {children}
  </AtomicLink>
);
