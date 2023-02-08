/* eslint-disable max-len */
import React, { FC, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import BitcoinSvg from '@betnomi/libs/assets/img/coins/bitcoin.svg';
import { DescriptionRow } from '../BonusesTableDescriptionRow';

import styles from './styles.module.scss';

interface DataProps {
  name: string;
  factor: number;
  amount: number;
  status: string;
}

interface Props {
  data: DataProps[];
}

const BonusesTable: FC<Props> = ({ data }) => {
  const [descriptionsIndex, setDescriptionsIndex] = useState<any>([]);

  const { t } = useTranslation('profile');

  const descriptionHandler = (index: number) => {
    if (descriptionsIndex.includes(index)) {
      return setDescriptionsIndex(descriptionsIndex.filter((currentIndex: number) => currentIndex !== index));
    }
    setDescriptionsIndex([...descriptionsIndex, index]);
  };

  const checkActive = (index: any) => {
    if (descriptionsIndex.includes(index)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className={styles.title_wrap}>
        <div className={styles.title_info}>
          <h4>{t('Bonus Codes')}</h4>
          <p>{t('Do you have a bonus code? Add it to the list')}</p>
        </div>
        <button className={styles.addBtn}>
          <>
            <span>+</span>
            {t('Add Bonus Code')}
          </>
        </button>
      </div>
      <div className={styles.table_content}>
        <table className={styles.table}>
          <thead className={styles.table_header}>
            <tr>
              <th className={styles.th}>{t('Bonus Name')}</th>
              <th className={styles.th}>{t('Wagering Factor')}</th>
              <th className={styles.th}>{t('Amount')}</th>
              <th className={styles.th}>{t('Status')}</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ name, factor, amount, status }, i) => (
              <Fragment key={name + factor}>
                <tr className={styles.tr} onClick={() => descriptionHandler(i)}>
                  <td className={styles.td}>{name}</td>
                  <td className={styles.td}>{factor === 1 ? '-' : `${factor}X`}</td>
                  <td className={styles.td}>
                    <div className={styles.amount}>
                      {`$ ${amount}`}
                      <img src={BitcoinSvg} alt="bitcoin icon" width={16} height={16} />
                    </div>
                  </td>
                  <td className={classNames(styles.td, styles.status)}>
                    {status}
                    <button className={classNames(styles.icon, { [styles.active]: checkActive(i) })}>
                      <FontIcon name={FontIconName.IconArrowBottom} size={16} />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4}>
                    <DescriptionRow active={checkActive(i)} />
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export { BonusesTable };
