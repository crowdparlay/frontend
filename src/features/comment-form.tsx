import {zodResolver} from '@hookform/resolvers/zod';
import {Eye, Lightbulb, Send, Trash2, Unlink, X} from 'lucide-react';
import {HTMLAttributes, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {cn} from '~/lib/utils';

import {FormattedContent} from '~/features/formatted-content';
import {Profile} from '~/features/profile';
import {ReplySubjectQuote} from '~/features/reply-subject-quote';

import {CommentEntity, SubjectEntity} from '~/entities/types';

import {UserEntity} from '~/shared/api/types';
import {Form, FormControl, FormField, FormItem} from '~/shared/ui';
import {Button} from '~/shared/ui/button';
import {Separator} from '~/shared/ui/separator';
import {Textarea} from '~/shared/ui/textarea';
import {Toggle} from '~/shared/ui/toggle';

const formSchema = z.object({
  content: z.string().min(1).max(1000),
});

type CommentFormProps = Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onReset'> & {
  author: UserEntity;
  subject?: SubjectEntity;
  onRemoveSubject: () => void;
  onSubmit: (content: string) => void;
  onReset: (content: string) => void;
  onHide?: () => void;
  onTogglePreview?: (preview: boolean) => void;
};

export const CommentForm = (props: CommentFormProps) => {
  const {
    author,
    subject,
    onRemoveSubject,
    onSubmit,
    onReset,
    onHide,
    onTogglePreview,
    className,
    ...otherProps
  } = props;
  const [preview, setPreview] = useState(false);

  useEffect(() => onTogglePreview?.(preview), [onTogglePreview, preview]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {content: ''},
    mode: 'all',
  });

  const isReplyToComment = subject instanceof CommentEntity;

  return (
    <Form {...form}>
      <form
        className={cn('flex flex-col gap-5 group', className)}
        onSubmit={form.handleSubmit(({content}) => {
          onSubmit(content);
          form.reset();
        })}
        onReset={() => {
          onReset?.(form.getValues().content);
          form.reset();
          setPreview(false);
        }}
        {...otherProps}
      >
        <div className="flex-none flex justify-between">
          <div className="flex flex-1 justify-between">
            <div className="flex gap-2 items-center">
              <Profile user={author} variant="md" />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onHide}>
            <X />
          </Button>
        </div>
        <div className="flex-1 flex flex-col gap-3.5">
          {preview && (
            <div>
              {isReplyToComment && <ReplySubjectQuote subject={subject} />}
              <FormattedContent>{form.getValues().content}</FormattedContent>
            </div>
          )}
          {preview || (
            <div className="flex-1 border rounded-lg overflow-hidden">
              {isReplyToComment && (
                <div className="flex h-10 gap-2 items-center border-b group/reply-subject-header">
                  <p className="shrink-0 ms-3 text-xs text-muted-foreground">Replying to</p>
                  <Profile user={subject.author} variant="xs" className="shrink-0" />
                  <div className="flex-1 text-sm opacity-40 text-nowrap truncate me-3 group-hover/reply-subject-header:me-0">
                    {subject.content}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 rounded-none hidden group-hover/reply-subject-header:inline"
                    onClick={onRemoveSubject}
                  >
                    <Unlink />
                  </Button>
                </div>
              )}
              <FormField
                control={form.control}
                name="content"
                render={({field}) => (
                  <FormItem className="h-full">
                    <FormControl className="h-full">
                      <Textarea
                        rows={3}
                        maxLength={1000}
                        spellCheck={false}
                        placeholder={isReplyToComment ? 'Your reply' : 'Your comment'}
                        className="bg-transparent rounded-none border-none scrollbar-none resize-none placeholder:text-sm/6 placeholder:text-muted-foreground/30"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
          {preview && <Separator />}
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-2">
              <Lightbulb className="w-4 h-4 stroke-muted-foreground" />
              <p className="text-xs text-muted-foreground">You can use Markdown</p>
            </div>
            <div className="space-x-3">
              <Toggle className="rounded-full" onClick={() => setPreview(!preview)}>
                <Eye />
              </Toggle>
              <Button type="reset" variant="outline" className="rounded-full">
                <Trash2 /> Discard
              </Button>
              <Button
                type="submit"
                variant="default"
                className="rounded-full"
                disabled={!form.formState.isDirty || !form.formState.isValid}
              >
                <Send /> Send
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
