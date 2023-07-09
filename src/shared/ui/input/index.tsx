import classNames from 'classnames';
import {InputHTMLAttributes, useCallback, useState} from 'react';

import EyeIcon from './assets/eye.svg';
import cls from './index.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
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
    center,
    type = 'text',
    ...otherProps
  } = props;

  const isPasswordMode = type === 'password';

  const customTypeInitial = isPasswordMode && alwaysShown ? 'text' : type;
  const [customType, setCustomType] = useState(customTypeInitial);

  const mods = {
    [cls.disabled]: disabled,
    [cls.invalid]: isInvalid,
    [cls.center]: center,
    [cls.focus]: focus,
    [cls.hover]: hover,
    [cls.password]: isPasswordMode,
  };

  const passwordMods = {
    [cls.customType]: customType !== type,
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

      {isPasswordMode && (
        <button
          type={'button'}
          className={classNames(cls.passwordButton, passwordMods)}
          onClick={onPasswordButtonClick}
        >
          <EyeIcon />
        </button>
      )}
    </div>
  );
};
