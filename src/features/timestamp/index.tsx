import {HTMLAttributes, ReactNode, useEffect, useReducer} from 'react';
import {format, getTimeSince} from '~/lib/utils';

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '~/shared/ui/tooltip';

export interface TimestampProps extends HTMLAttributes<HTMLDivElement> {
  date: string | Date;
  icon?: ReactNode;
}

export const Timestamp = (props: TimestampProps) => {
  const {date, icon, ...otherProps} = props;

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    const timer = setInterval(() => forceUpdate(), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="h-fit cursor-auto p-2 -m-2">
          <p className="text-sm leading-none text-muted-foreground">
            {icon} {getTimeSince(date)}
          </p>
        </TooltipTrigger>
        <TooltipContent {...otherProps}>
          <p>{format(date)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
