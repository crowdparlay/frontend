import classNames from 'classnames';
import {FormEvent, TextareaHTMLAttributes, useCallback} from 'react';

import cls from './index.module.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = (props: TextAreaProps) => {
  const {className, ...otherProps} = props;

  const onTextareaInput = useCallback((event: FormEvent<HTMLTextAreaElement>) => {
    const el = event.currentTarget;

    el.style.height = 'auto';
    el.style.height = el.scrollHeight - 4 + 'px';

    if (el.maxLength !== -1 && el.value.length >= el.maxLength) {
      console.log('cropping', el.value.length, el.maxLength);
      el.value = el.value.slice(0, el.maxLength);
    }
  }, []);

  return (
    <textarea
      className={classNames(cls.autoresize, cls.textarea, className)}
      onInput={onTextareaInput}
      autoComplete={'off'}
      autoCorrect={'off'}
      autoCapitalize={'off'}
      spellCheck={false}
      {...otherProps}
    />
  );
};
