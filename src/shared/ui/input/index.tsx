import classNames from 'classnames';
import {InputHTMLAttributes, useCallback, useState} from 'react';

import {Text, TextSize} from '~/shared/ui';

import ErrorIcon from './assets/error.svg';
import EyeIcon from './assets/eye.svg';
import cls from './index.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  errorMessage?: string;
  center?: boolean;
  focus?: boolean;
  hover?: boolean;
  alwaysShown?: boolean;
}

export const Input = (props: InputProps) => {
  const {
    alwaysShown,
    className,
    hover,
    focus,
    disabled,
    isInvalid,
    errorMessage,
    center,
    type = 'text',
    ...otherProps
  } = props;

  const isPasswordMode = type === 'password';

  const customTypeInitial = isPasswordMode && alwaysShown ? 'text' : type;
  const [customType, setCustomType] = useState(customTypeInitial);

  const [isErrorIconHovered, setIsErrorIconHovered] = useState(false);

  const mods = {
    [cls.disabled]: disabled,
    [cls.invalid]: isInvalid,
    [cls.center]: center,
    [cls.focus]: forceFocus,
    [cls.hover]: forceHover,
    [cls.showMods]: isPasswordMode || isInvalid,
    [cls.showMods2]: isPasswordMode && isInvalid,
  };

  const passwordMods = {
    [cls.customType]: customType !== type,
  };

  const tooltipMods = {
    [cls.tooltipVisible]: isErrorIconHovered,
  };

  const onPasswordButtonClick = useCallback(() => {
    if (alwaysShown) {
      return;
    }

    setCustomType((prevState) => (prevState === 'password' ? 'text' : 'password'));
  }, [alwaysShown]);

  return (
    <div className={cls.wrapper}>
      <input
        className={classNames(cls.input, mods, className)}
        disabled={disabled}
        type={customType}
        {...otherProps}
      />

      <div className={cls.mods}>
        {isPasswordMode && (
          <button
            type={'button'}
            className={classNames(cls.passwordButton, passwordMods)}
            onClick={onPasswordButtonClick}
          >
            <EyeIcon />
          </button>
        )}

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
