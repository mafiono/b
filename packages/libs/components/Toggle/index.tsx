import React, { FC, useCallback } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props {
  size?: number;
  value: boolean;
  disabled?: boolean;
  onChange: (val: boolean) => void;
}

const Toggle: FC<Props> = ({
  value, onChange, size = 24, disabled, 
}) => {
  const onToggle = useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      onChange(!value);
    },
    [onChange, value],
  );
  return (
    <button
      className={classNames(styles.toggle, {
        [styles.active]: value,
        [styles.disabled]: disabled,
      })}
      style={{
        height: size,
        width: Math.round(size * 1.5),
        borderRadius: Math.round(size / 2),
      }}
      onMouseDown={onToggle}
    >
      <div
        className={styles.dot}
        style={{
          height: Math.round(size * 0.66),
          width: Math.round(size * 0.66),
          top: Math.round(size * 0.175),
          left: value ? Math.round(size * 0.66) : Math.round(size * 0.175),
        }}
      />
    </button>
  );
};

export { Toggle };
