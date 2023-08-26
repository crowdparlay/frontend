import classNames from 'classnames';
import {InputHTMLAttributes, useCallback, useState} from 'react';

import {Text, TextSize} from '~/shared/ui';

import ErrorIcon from './assets/error.svg';
import EyeIcon from './assets/eye.svg';
import FileIcon from './assets/file.svg';
import cls from './index.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  top?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  center?: boolean;
  forceFocus?: boolean;
  forceHover?: boolean;
  alwaysShown?: boolean;
  onFileChanged?: (data: string) => void;
}

export const Input = (props: InputProps) => {
  const {
    top,
    alwaysShown,
    className,
    forceHover,
    forceFocus,
    disabled,
    isInvalid,
    errorMessage,
    center,
    type = 'text',
    accept,
    onFileChanged,
    ...otherProps
  } = props;

  const isFileMode = type === 'file';
  const isPasswordMode = type === 'password';

  let customTypeInitial = type;
  if (isPasswordMode && alwaysShown) {
    customTypeInitial = 'text';
  }
  if (isFileMode) {
    customTypeInitial = 'text';
  }

  const [customType, setCustomType] = useState(customTypeInitial);

  const [isErrorIconHovered, setIsErrorIconHovered] = useState(false);

  const wrapperMods = {
    [cls.top]: Boolean(top),
  };

  const mods = {
    [cls.disabled]: disabled,
    [cls.invalid]: isInvalid,
    [cls.center]: center,
    [cls.focus]: forceFocus,
    [cls.hover]: forceHover,
    [cls.showMods]: isFileMode || isPasswordMode || isInvalid,
    [cls.showMods2]: (isPasswordMode || isFileMode) && isInvalid,
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
    <div className={classNames(cls.wrapper, wrapperMods, className)} data-top={top}>
      <input
        className={classNames(cls.input, mods)}
        disabled={disabled}
        type={customType}
        {...otherProps}
      />

      <div className={cls.mods}>
        {isFileMode && (
          <>
            <label className={cls.fileLabel} htmlFor="file_upload">
              <FileIcon />
            </label>
            <input
              className={cls.file}
              type="file"
              accept={accept}
              id="file_upload"
              name="file_upload"
              onChange={(e) => {
                const file = e.target.files![0];
                if (file && onFileChanged) {
                  const reader = new FileReader();

                  reader.onloadend = () => {
                    if (reader.result) {
                      onFileChanged(reader.result.toString());
                    }
                  };

                  reader.readAsDataURL(file);
                }
              }}
            />
          </>
        )}

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
