import React from 'react';
import cx from 'classnames';
import { SportsBetList } from '../../../store/profile/types';
import { useTranslation } from '../../../i18n';
import styles from './styles.module.scss';

type Props = {
  list?: SportsBetList
};

export const SportsBetTable:React.FC<Props> = () => {
  const { t } = useTranslation('profile');
  
  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <tr className={styles.tr}>
          <th className={cx(styles.th, styles.td_m)}>
            {t('Date')}
          </th>
          <th className={styles.th}>
            {t('ID')}
          </th>
          <th className={styles.th}>
            {t('Bet Type')}
          </th>
          <th className={styles.th}>
            {t('Stake')}
          </th>
          <th className={styles.th}>
            {t('Potential  Win')}
          </th>
          <th className={styles.th}>
            {t('Result')}
          </th>
          <th className={styles.th}>
            {t('Share')}
          </th>
        </tr>
      </thead>
      <tbody />
    </table>
  ); 
};
