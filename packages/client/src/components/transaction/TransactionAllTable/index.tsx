import React, { useMemo } from 'react';
import cx from 'classnames';
import { format } from 'date-fns';
import { TransactionAllList, TransactionAllItem } from '../../../store/profile/types';
import { SportsBetRowMoney } from '../../profile/SportsBetRowMoney';
import { TransactionStatus } from '../TransactionStatus';
import { useTranslation } from '../../../i18n';
import styles from './styles.module.scss';

type RowProps = {
  item: TransactionAllItem
};

const Row:React.FC<RowProps> = ({
  item: {
    amount,
    createdAt,
    currency,
    finalAmount,
    id,
    product,
    resultType,
    transactionType,
  },
}) => {
  const modifiedDate = useMemo(() => format(new Date(Number(createdAt) * 1000), 'PP HH:mm'), [createdAt]);
  return (
    <tr>
      <td className={cx(styles.td, styles.td_m)}>
        {id}
      </td>
      <td className={styles.td}>
        {modifiedDate}
      </td>
      <td className={styles.td}>
        {transactionType}
      </td>
      <td className={styles.td}>
        {product}
      </td>
      <td className={styles.td}>
        <TransactionStatus
          label={resultType} 
          type={resultType}
        />
      </td>
      <td className={styles.td}>
        <SportsBetRowMoney coin={currency} value={amount} />
      </td>
      <td className={styles.td}>
        <SportsBetRowMoney coin={currency} value={finalAmount} />
      </td>
    </tr>
  ); 
};

type Props = {
  list: TransactionAllList
};

export const TransactionAllTable:React.FC<Props> = ({ list }) => {
  const { t } = useTranslation('profile');
  
  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <tr className={styles.tr}>
          <th className={cx(styles.th, styles.td_m)}>
            {t('Transaction ID')}
          </th>
          <th className={styles.th}>
            {t('Date')}
          </th>
          <th className={styles.th}>
            {t('Type')}
          </th>
          <th className={styles.th}>
            {t('Product')}
          </th>
          <th className={styles.th}>
            {t('Status')}
          </th>
          <th className={styles.th}>
            {t('Amount')}
          </th>
          <th className={styles.th}>
            {t('Final Amount')}
          </th>
        </tr>
      </thead>
      <tbody>
        {list?.map((el) => <Row item={el} key={el.id} />)}
      </tbody>
    </table>
  );
};
