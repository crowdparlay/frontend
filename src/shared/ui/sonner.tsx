import {useTheme} from 'next-themes';
import {Toaster as Sonner} from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({...props}: ToasterProps) => {
  const {theme = 'system'} = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'backdrop-blur border group toast bg-background/90 group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium text-sm! h-8! px-3! rounded-md!',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium text-sm! h-8! px-3! rounded-md!',
        },
      }}
      {...props}
    />
  );
};

export {Toaster};
