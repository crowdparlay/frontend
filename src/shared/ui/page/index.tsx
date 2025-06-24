import {HTMLAttributes} from 'react';
import {cn} from '~/lib/utils';

export const Page = (props: HTMLAttributes<HTMLElement>) => {
  const {className, children, ...otherProps} = props;

  return (
    <main
      className={cn('flex flex-col justify-center items-center mt-10 py-6', className)}
      {...otherProps}
    >
      {children}
    </main>
  );
};
