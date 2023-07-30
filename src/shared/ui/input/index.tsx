import classNames from 'classnames';
import {InputHTMLAttributes, useState} from 'react';

import {Text, TextSize} from '~/shared/ui';

import ErrorIcon from './assets/error.svg';
import cls from './index.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  errorMessage?: string;
  center?: boolean;
  forceFocus?: boolean;
  forceHover?: boolean;
  alwaysShown?: boolean;
}

export const Input = (props: InputProps) => {
  const {
    alwaysShown,
    className,
    forceHover,
    forceFocus,
    disabled,
    isInvalid,
    errorMessage,
    center,
    type = 'text',
    ...otherProps
  } = props;

  const customTypeInitial = alwaysShown ? 'text' : type;
  const [customType] = useState(customTypeInitial);

  const [isErrorIconHovered, setIsErrorIconHovered] = useState(false);

  const mods = {
    [cls.password]: type === 'password',
    [cls.disabled]: disabled,
    [cls.invalid]: isInvalid,
    [cls.center]: center,
    [cls.focus]: forceFocus,
    [cls.hover]: forceHover,
    [cls.showMods]: isInvalid,
  };

  const tooltipMods = {
    [cls.tooltipVisible]: isErrorIconHovered,
  };

  return (
    <div className={cls.wrapper}>
      <input
        className={classNames(cls.input, mods, className)}
        disabled={disabled}
        type={customType}
        {...otherProps}
      />

      <div className={cls.mods}>
        {isInvalid && (
          <div
            className={cls.errorContainer}
            onMouseEnter={() => setIsErrorIconHovered(true)}
            onMouseLeave={() => setIsErrorIconHovered(false)}
          >
            <ErrorIcon />

            {errorMessage && (
              <Text size={TextSize.S} className={classNames(cls.tooltip, tooltipMods)}>
                {errorMessage}
              </Text>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
