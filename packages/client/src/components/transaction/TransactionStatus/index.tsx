import React from 'react';
import cx from 'classnames';
import { TransactionAllStatus } from '../../../constants/transaction';
import styles from './styles.module.scss';

type Props = {
  type: TransactionAllStatus,
  label: string,
};

export const TransactionStatus:React.FC<Props> = ({ type, label }) => (
  <div className={cx(styles.status, styles[type])}>
    {label}
  </div>
); 
