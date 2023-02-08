import React from 'react';
import { FontIconName, FontIcon } from '@betnomi/libs/components/FontIcon';
import { useTranslation } from '../../../i18n';
import styles from './styles.module.scss';

type RowProps = {
  startTime: string;
  gameName: {
    label: string;
    icon: FontIconName;
  }
  bet: string;
  odds: number;
};

export const SportsBetDescriptionRow: React.FC<RowProps> = ({
  startTime, gameName, bet, odds,
}) => {
  const { t } = useTranslation('profile');
  return (
    <div className={styles.row}>
      <div className={styles.cell}>
        <div className={styles.title}>
          {`${t('Starting time')}:`}
        </div>
        <div className={styles.value}>
          <span>{startTime}</span>
        </div>
      </div>
      <div className={styles.cell}>
        <div className={styles.title}>
          {`${t('Game name')}:`}
        </div>
        <div className={styles.value}>
          <FontIcon name={gameName.icon} size={16} className={styles.icon} />
          <span>{gameName.label}</span>
        </div>
      </div>
      <div className={styles.cell}>
        <div className={styles.title}>
          {`${t('Bet')}:`}
        </div>
        <div className={styles.value}>
          <span>{bet}</span>
        </div>
      </div>
      <div className={styles.cell}>
        <div className={styles.title}>
          {`${t('Odds')}:`}
        </div>
        <div className={styles.value}>
          <span>{odds}</span>
        </div>
      </div>
    </div>
  );
};
