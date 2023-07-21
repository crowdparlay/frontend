import classNames from 'classnames';
import React, {FormHTMLAttributes, useCallback} from 'react';

import cls from './index.module.scss';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  onSubmit?: () => void;
}

export const Form = (props: FormProps) => {
  const {className, children, onSubmit, ...otherProps} = props;

  const onFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit && onSubmit();
    },
    [onSubmit],
  );

  return (
    <form onSubmit={onFormSubmit} className={classNames(cls.form, className)} {...otherProps}>
      {children}
    </form>
  );
};
