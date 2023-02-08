import React from 'react';
import styles from './styles.module.scss';

type Props = {
  text?: string;
};

const LineDivorce: React.FC<Props> = ({ text }) => (
  <div className={styles.out}>
    <div className={styles.line} />
    {text && <div className={styles.text}>{text}</div>}
    <div className={styles.line} />
  </div>
);

export default LineDivorce;
