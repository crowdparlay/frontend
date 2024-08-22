import classNames from 'classnames';
import {HTMLAttributes, useCallback, useMemo, useState} from 'react';

import cls from './index.module.scss';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  total: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const {total, defaultValue, value, onChange, className, ...otherProps} = props;

  const [localValue, setLocalValue] = useState(defaultValue ?? 1);

  const items = useMemo(() => {
    return Array.from({length: total}, (_, i) => i + 1);
  }, [total]);

  const currentValue = useMemo(() => {
    if (value !== undefined) {
      return value;
    }
    return localValue;
  }, [localValue, value]);

  const onButtonClick = useCallback(
    (num: number) => {
      setLocalValue(num);
      onChange?.(num);
    },
    [onChange],
  );

  return (
    <div className={classNames(cls.container, className)} {...otherProps}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onButtonClick(item)}
          className={classNames(cls.button, item === currentValue && cls.active)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
