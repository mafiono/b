import React, { FC, useCallback } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { FontIcon, FontIconName } from '../FontIcon';

interface IProps {
  checked: boolean;
  onCheck: (val: boolean) => void;
  className?: string;
  hasError?: boolean;
}

const Checkbox: FC<IProps> = ({
  checked, onCheck, children, className, hasError,
}) => {
  const onMouseDown = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    onCheck(!checked);
  }, [checked]);

  return (
    <button
      className={classNames(styles.checkbox, className, { [styles.checked]: checked })}
      onMouseDown={onMouseDown}
      type="button"
    >
      <span className={classNames(styles.inner, { [styles.error]: hasError })}>
        {checked && <FontIcon name={FontIconName.Checked} size={12} />}
      </span>

      {!!children && <div className={styles.label}>{children}</div>}
    </button>
  );
};

export { Checkbox };
