import React, {ReactNode} from 'react';
import {isEmoji} from '~/lib/utils';

import {useReactions} from '~/entities/reaction/hook';
import {SubjectEntity} from '~/entities/types';

import {Button} from '~/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu';

interface Props {
  subject: SubjectEntity;
  children: ReactNode;
}

export const ReactionContextMenu: React.FC<Props> = ({subject, children}) => {
  const {availableReactions, reactions, toggleReaction} = useReactions(subject);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={-35}
        alignOffset={50}
        className="rounded-xl bg-background"
      >
        <div className="flex flex-wrap max-w-60">
          {availableReactions
            .concat('убей себя')
            .filter((reaction) => !reactions.draft.includes(reaction))
            .map((reaction) => (
              <DropdownMenuItem key={reaction} className="bg-transparent! p-0">
                <Button
                  key={reaction}
                  variant="ghost"
                  size={isEmoji(reaction) ? 'icon' : 'default'}
                  className="text-xl p-6 hover:bg-primary/10 transition-none"
                  onClick={() => toggleReaction({subjectId: subject.id, toggledReaction: reaction})}
                >
                  {reaction}
                </Button>
              </DropdownMenuItem>
            ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
