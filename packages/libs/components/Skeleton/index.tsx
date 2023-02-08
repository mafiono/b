import React, { FC } from 'react';
import styles from './styles.module.scss';

interface Props {
  width?: number
  height?: number
}

const Skeleton: FC<Props> = ({ width = 220, height = 280, children }) => (
  <div style={{ paddingBottom: `${(height / width) * 100}%` }} className={styles.wrapper}>
    {children}
  </div>
);

export default Skeleton;
