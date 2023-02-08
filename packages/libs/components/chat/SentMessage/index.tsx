import React, { FC, useMemo } from 'react';
import format from 'date-fns/format';
import styles from './styles.module.scss';

interface IProps {
  timestamp: number
}

const SentMessage: FC<IProps> = ({ children, timestamp }) => {
  const date = useMemo(() => format(timestamp, 'HH:mm'), [timestamp]);

  return (
    <div className={styles.message}>
      <div className={styles.time}>{date}</div>
      <div className={styles.text}>{children}</div>
    </div>
  );
};

export { SentMessage };
