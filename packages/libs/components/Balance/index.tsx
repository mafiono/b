import React, { FC, useMemo } from 'react';
import styles from './styles.module.scss';

interface Props {
  value: number;
  precision?: number;
}

const splitBalance = (val: number, precision: number): string[] => [
  Math.floor(val).toString(),
  (val % 1).toFixed(precision).substr(2),
];

const Balance: FC<Props> = ({ value = 0, precision = 8 }) => {
  const split = useMemo(() => splitBalance(value || 0, precision), [value, precision]);
  const slicedSplit = split.join('.').substr(0,9).split('.')

  return (
    <span>
      <span>{slicedSplit[0]}</span>
      <span className={styles.gray}>
        .
        {slicedSplit[1]}
      </span>
    </span>
  );
};

export { Balance };
