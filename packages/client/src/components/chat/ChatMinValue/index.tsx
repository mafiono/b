import React, { FC } from 'react';
import { CoinType } from '@betnomi/libs/types';
import { useTranslation } from '../../../i18n';
import styles from './styles.module.scss';

interface IProps {
  min: number;
  coin: CoinType
  precision?: number;
}

const ChatMinValue: FC<IProps> = ({ min, coin, precision = 8 }) => {
  const { t } = useTranslation('main');

  return (

    <div className={styles.minimum}>
      {t('Min {{count}} {{coin}}', {
        count: parseFloat((min || 0).toFixed(precision)),
        coin,
      })}
    </div>
  );
};

export { ChatMinValue };
