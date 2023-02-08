/* eslint-disable max-len */
import React, { FC } from 'react';
import { CoinImg } from '@betnomi/libs/components/CoinImg';
import { Timer } from '@betnomi/libs/components/Timer';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';

import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface DataProps {
  withdrawn: string;
  pending: string;
  available: string;
  active: boolean;
  type: string;
}

interface Props {
  data: DataProps[];
}

const CashBackTable: FC<Props> = ({ data }) => {
  const { t } = useTranslation('profile');

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.title_wrap}>
          <div className={styles.title}>
            <h4>{t('Cashback Cashout')}</h4>
            <p>
              {t(
                "Cashback Cashout is a new feature on the Organizer's website, which allows the users who have special gaming accounts on the Organizer's official website...",
              )}
            </p>
          </div>
          <div className={styles.right_panel}>
            <div className={styles.my_cashback}>
              <p className={styles.description}>{t('My Cashback')}</p>
              <p className={styles.cashback_value}>2%</p>
            </div>
            <div className={styles.timer_wrap}>
              <p className={styles.description}>{`${t('Payout in')}:`}</p>
              <Timer />
            </div>
          </div>
        </div>
        <p className={styles.link}>Show more</p>
      </div>
      <div className={styles.table_content}>
        <table className={styles.table}>
          <thead className={styles.table_header}>
            <tr>
              <th className={styles.th}>{t('Withdrawn')}</th>
              <th className={styles.th}>{t('Pending')}</th>
              <th className={styles.th}>{t('Available')}</th>
              <th className={styles.th}>{}</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ withdrawn, pending, available, type, active }) => (
              <tr key={pending + type} className={styles.tr}>
                <td className={styles.td}>
                  <div className={styles.td_wrap}>
                    {`$ ${withdrawn}`}
                    <CoinImg imgData={type} />
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.td_wrap}>
                    {`$ ${pending}`}
                    <CoinImg imgData={type} />
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.td_wrap}>
                    {`$ ${available}`}
                    <CoinImg imgData={type} />
                  </div>
                </td>
                <td className={styles.td}>
                  <div className={styles.td_wrap}>
                    <button className={classNames(styles.withdrawn_button, { [styles.active]: active })}>
                      <FontIcon name={FontIconName.Bitcoin} size={16} />
                      Withdrawn
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { CashBackTable };
