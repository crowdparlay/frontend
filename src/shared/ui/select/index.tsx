import classNames from 'classnames';
import {CSSProperties, MouseEvent, useCallback, useRef, useState} from 'react';

import ArrowIcon from './arrow.svg';
import cls from './index.module.scss';

export type SelectDropdownPosition = 'top' | 'bottom';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: SelectOption;
  onChange?: (option: SelectOption) => void;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  fullWidth?: boolean;
  position: SelectDropdownPosition;
}

export const Select = (props: SelectProps) => {
  const {options, value, position, fullWidth, onChange, disabled, className, ...otherProps} = props;

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState(options[0]);

  const mods = {
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  };

  const dropdownMods = {
    [cls[position]]: true,
  };

  const arrowMods = {
    [cls.open]: isOpen,
  };

  const handleToggle = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (disabled || !dropdownRef || event.target === dropdownRef.current) {
        return;
      }

      !disabled && setIsOpen((prevState) => !prevState);
    },
    [disabled, dropdownRef],
  );

  const handleChangeSelect = (
    event: MouseEvent<HTMLDivElement>,
    active: boolean,
    option: SelectOption,
  ) => {
    event.stopPropagation();

    if (option.disabled || active) {
      return;
    }

    if (onChange !== undefined) {
      onChange(option);
    }

    setLocalValue(option);
    setIsOpen(false);
  };

  return (
    <div
      onClick={handleToggle}
      aria-disabled={disabled}
      className={classNames(cls.select, mods, className)}
      {...otherProps}
    >
      <span className={cls.label}>{(value ?? localValue).label}</span>
      <div className={classNames(cls.arrow, arrowMods)}>
        <ArrowIcon />
      </div>

      {isOpen && (
        <div className={classNames(cls.dropdown, dropdownMods)} ref={dropdownRef}>
          {options.map((option) => (
            <Option
              key={option.value.toString()}
              data={option}
              active={(value ?? localValue) === option}
              onClick={handleChangeSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface OptionProps {
  data: SelectOption;
  active: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>, active: boolean, option: SelectOption) => void;
}

const Option = (props: OptionProps) => {
  const {data, active, onClick} = props;
  const {label, disabled} = data;

  const mods = {
    [cls.disabled]: disabled,
    [cls.active]: active,
  };

  return (
    <div
      aria-disabled={disabled}
      className={classNames(cls.option, mods)}
      onClick={(e) => onClick(e, active, data)}
    >
      <span className={cls.label}>{label}</span>
    </div>
  );
};
