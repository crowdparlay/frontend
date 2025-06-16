import {createElement, ReactElement} from 'react';
import Markdown, {Components} from 'react-markdown';
import remarkDirective from 'remark-directive';
import {visit} from 'unist-util-visit';
import {cn} from '~/lib/utils';

function audioDirectivePlugin() {
  return function (tree: any) {
    visit(tree, function (node) {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        if (node.name !== 'audio') return;

        const data = node.data ?? (node.data = {});
        const source = node.children.map((child: any) => child.value).join(' ');

        data.hName = 'audio';
        data.hProperties = {controls: true, src: source};
      }
    });
  };
}

const classNames: Record<string, string> = {
  h1: 'text-4xl font-bold tracking-tight lg:text-5xl',
  h2: 'not-first:mt-6 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'text-2xl font-semibold tracking-tight',
  h4: 'text-xl font-semibold tracking-tight',
  p: 'not-first:mt-2',
  blockquote: 'mt-3 border-l-2 pl-3',
  ul: 'ml-6 list-disc [&>li]:mt-2',
  a: 'text-blue-500 hover:opacity-90',
};

const components: Components = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  img: ({node, className, ...otherProps}) => (
    <a href={otherProps.src} target="_blank">
      <img
        className={cn('text-indent-loose border rounded-md max-h-[calc(25vh)] w-fit', className)}
        {...otherProps}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.className = 'indent-3 w-fit leading-[1]';
        }}
      />
    </a>
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  audio: ({node, className, ...otherProps}) => (
    <audio
      controls
      className={cn(
        'h-10 scheme-dark dark:scheme-light contrast-[1.8] dark:filter-none dark:opacity-90',
        className,
      )}
      {...otherProps}
      onError={(e) => {
        const target = e.target as HTMLAudioElement;
        target.style.display = 'none';
        target.after('🔉 ' + target.src);
      }}
    />
  ),
};

Object.keys(classNames).forEach((element) => {
  // @ts-ignore
  components[element] = ({node, ...props}) =>
    createElement(node.tagName, {...props, className: classNames[element]});
});

export const FormattedContent = ({children}: {children: string}): ReactElement => (
  <Markdown
    components={components}
    unwrapDisallowed={true}
    remarkPlugins={[remarkDirective, audioDirectivePlugin]}
  >
    {children}
  </Markdown>
);
