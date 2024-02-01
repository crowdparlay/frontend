import classNames from 'classnames';
import {FormHTMLAttributes, useCallback, useState} from 'react';

import {Button, ButtonVariant, Form, Text, TextArea, TextSize} from '~/shared/ui';

import DeleteIcon from './assets/delete.svg';
import FileIcon from './assets/file.svg';
import cls from './index.module.scss';

// @ts-ignore
export interface ReplyFormProps extends FormHTMLAttributes<HTMLFormElement> {
  postId: string;
  maxLength: number;
  onSubmit?: (payload: {postId: string; value: string}) => void;
}

export const ReplyForm = (props: ReplyFormProps) => {
  const {postId, maxLength, onSubmit, className, ...otherProps} = props;

  const [value, setValue] = useState('');

  const onFormSubmit = useCallback(
    (value: string) => {
      setValue('');
      if (onSubmit !== undefined) {
        onSubmit({postId, value});
      }
    },
    [postId, onSubmit],
  );

  return (
    <Form
      onSubmit={() => onFormSubmit(value)}
      className={classNames(cls.container, className)}
      {...otherProps}
    >
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Введите, вставьте, вырежьте текст здесь..."
        maxLength={maxLength}
      />

      <div className={cls.actions}>
        <Button type="submit">Send</Button>

        <Button variant={ButtonVariant.CLEAR}>
          <FileIcon />
          Insert media
        </Button>
        <Button variant={ButtonVariant.CLEAR}>
          <DeleteIcon />
          Cancel
        </Button>

        <div style={{width: '100%'}} />

        <Text style={{whiteSpace: 'nowrap'}} size={TextSize.S}>
          {value.length} / {maxLength}
        </Text>
      </div>
    </Form>
  );
};
