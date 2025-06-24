import {RouteInstance, RouteParams} from 'atomic-router';
import {HTMLAttributes} from 'react';
import {cn} from '~/lib/utils';

import {Link} from '~/shared/ui/link';

import Logo from './assets/logo.svg';

interface ColumnItem {
  label: string;
  route: string | RouteInstance<RouteParams>;
  openInNewTab?: boolean;
}

interface Column {
  title: string;
  items: ColumnItem[];
}

const columns: Column[] = [
  {
    title: 'Legal',
    items: [
      {
        label: 'Terms of use',
        route: '/terms-of-use',
      },
      {
        label: 'Platform policies',
        route: 'https://github.com/crowdparlay/foundation/wiki/Концепция',
        openInNewTab: true,
      },
      {
        label: 'Privacy',
        route: '#',
      },
    ],
  },
  {
    title: 'Contacts',
    items: [
      {
        label: 'Telegram',
        route: 'https://t.me/crowdparlay',
        openInNewTab: true,
      },
      {
        label: 'Twitter',
        route: '#',
      },
      {
        label: 'Email',
        route: '#',
      },
    ],
  },
  {
    title: 'Developers',
    items: [
      {
        label: 'Source code',
        route: 'https://github.com/crowdparlay',
        openInNewTab: true,
      },
      {
        label: 'API reference',
        route: 'https://bump.sh/undrcrxwn/doc/crowdparlay',
        openInNewTab: true,
      },
      {
        label: 'Status',
        route: '/forbidden',
      },
    ],
  },
];

export type FooterProps = HTMLAttributes<HTMLDivElement>;

export const Footer = (props: FooterProps) => {
  const {className, ...otherProps} = props;

  return (
    <footer className={cn('flex items-center px-6 py-8 border-t', className)} {...otherProps}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 mx-auto w-full sm:max-w-xl md:max-w-3xl text-sm">
        {columns.map(({title, items}) => (
          <div>
            <h3 className="leading-7 font-[Inter] font-bold mb-3">{title}</h3>
            <div className="flex flex-col gap-2">
              {items.map(({label, route, openInNewTab}, i) => (
                <Link key={i} to={route} target={openInNewTab ? '_blank' : undefined}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="w-max">
          <Logo className="flex-1 h-7 w-fit mb-3 invert dark:filter-none" />
          <div className="space-y-2 text-muted-foreground">
            <p>Copyright © {new Date().getFullYear()} Crowd Parlay</p>
            <p>All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
