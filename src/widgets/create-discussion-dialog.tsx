import {zodResolver} from '@hookform/resolvers/zod';
import {ArrowUpRight} from 'lucide-react';
import {HTMLAttributes, useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {cn} from '~/lib/utils';

import {DiscussionRoute} from '~/pages/discussion';

import {apiV1DiscussionsPostFx} from '~/shared/api';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input} from '~/shared/ui';
import {Button} from '~/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/shared/ui/dialog';
import {Textarea} from '~/shared/ui/textarea';

const formSchema = z.object({
  title: z.string().min(3, 'is too short').max(200, 'is too long'),
  content: z.string().min(10, 'is too short').max(1000, 'is too long'),
});

export const CreateDiscussionDialog = ({children, ...props}: HTMLAttributes<HTMLFormElement>) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {title: '', content: ''},
    mode: 'all',
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-background">
        <Form {...form}>
          <form
            className={cn('space-y-4', isLoading && 'blur-sm pointer-events-none')}
            onSubmit={form.handleSubmit((values) => {
              setIsLoading(true);
              apiV1DiscussionsPostFx({body: values})
                .then((result) => {
                  DiscussionRoute.route.navigate({
                    params: {discussionId: result.answer.id},
                    query: {},
                  });
                })
                .finally(() => setIsLoading(false));
            })}
          >
            <DialogHeader>
              <DialogTitle> New discussion</DialogTitle>
              <DialogDescription>Share your thoughts and get a feedback.</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-text">Title</FormLabel>
                  <FormMessage className="inline ms-2 text-sm text-red-700" />
                  <FormControl className="h-full">
                    <Input
                      maxLength={1000}
                      spellCheck={false}
                      className="h-auto bg-transparent rounded-xl scrollbar-none resize-none text-sm placeholder:text-sm/6 placeholder:text-muted-foreground/30"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({field}) => (
                <FormItem>
                  <FormLabel className="text-text">Content</FormLabel>
                  <FormMessage className="inline ms-2 text-sm text-red-700" />
                  <FormControl className="h-full">
                    <Textarea
                      rows={8}
                      maxLength={1000}
                      spellCheck={false}
                      className="h-auto bg-transparent rounded-xl scrollbar-none resize-none text-sm placeholder:text-sm/6 placeholder:text-muted-foreground/30"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                <ArrowUpRight /> Publish
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
