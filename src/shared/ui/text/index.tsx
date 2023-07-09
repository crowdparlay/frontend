import classNames from 'classnames';
import {ElementType, HTMLAttributes} from 'react';

import cls from './index.module.scss';

export enum TextSize {
  S = 's',
  M = 'm',
  L = 'l',
  XL = 'xl',
}

type ComponentProps = HTMLAttributes<HTMLParagraphElement | HTMLDivElement | HTMLHeadingElement>;

export interface TextProps extends ComponentProps {
  Component?: ElementType<ComponentProps>;
  size?: TextSize;
  center?: boolean;
}

export const Text = (props: TextProps) => {
  const {Component, children, size = TextSize.M, center, ...otherProps} = props;

  const Wrapper = Component || 'p';

  const mods = {
    [cls[size]]: true,
    [cls.center]: center,
  };

  return (
    <Wrapper className={classNames(cls.text, mods)} {...otherProps}>
      {children}
    </Wrapper>
  );
};
