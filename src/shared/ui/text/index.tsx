import classNames from 'classnames';
import {ElementType, HTMLAttributes} from 'react';

import cls from './index.module.scss';

export enum TextSize {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
  XXL = 'xxl',
}

type ComponentProps = HTMLAttributes<HTMLParagraphElement | HTMLDivElement | HTMLHeadingElement>;

export interface TextProps extends ComponentProps {
  Component?: ElementType<ComponentProps>;
  size?: TextSize;
  center?: boolean;
  accent?: boolean;
  serif?: boolean;
  italic?: boolean;
}

export const Text = (props: TextProps) => {
  const {Component, children, className, size = TextSize.M, center, accent, serif, italic, ...otherProps} = props;

  const Wrapper = Component || 'p';

  const mods = {
    [cls[size]]: true,
    [cls.center]: center,
    [cls.accent]: accent,
    [cls.serif]: serif,
    [cls.italic]: italic,
  };

  return (
    <Wrapper className={classNames(cls.text, mods, className)} {...otherProps}>
      {children}
    </Wrapper>
  );
};
