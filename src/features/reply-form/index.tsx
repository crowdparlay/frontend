import classNames from 'classnames';
import {FormHTMLAttributes, useCallback, useState} from 'react';

import {ButtonVariant, CustomButton, Form, Text, TextArea, TextSize} from '~/shared/ui';

import DeleteIcon from './assets/delete.svg';
import FileIcon from './assets/file.svg';
import cls from './index.module.scss';

// @ts-ignore
export interface ReplyFormProps extends FormHTMLAttributes<HTMLFormElement> {
  postId: string;
  maxLength: number;
  onSubmit?: (payload: {postId: string; value: string}) => void;
  onCancel?: () => void;
}

export const ReplyForm = (props: ReplyFormProps) => {
  const {postId, maxLength, onSubmit, onCancel, className, ...otherProps} = props;

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

  const onCancelClick = useCallback(() => {
    setValue('');
    if (onCancel) {
      onCancel();
    }
  }, [onCancel]);

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
        <CustomButton type="submit">Send</CustomButton>

        <CustomButton variant={ButtonVariant.CLEAR} type="button">
          <FileIcon />
          Insert media
        </CustomButton>
        <CustomButton onClick={onCancelClick} variant={ButtonVariant.CLEAR} type="reset">
          <DeleteIcon />
          Cancel
        </CustomButton>

        <div style={{width: '100%'}} />

        <Text style={{whiteSpace: 'nowrap'}} size={TextSize.S}>
          {value.length} / {maxLength}
        </Text>
      </div>
    </Form>
  );
};
