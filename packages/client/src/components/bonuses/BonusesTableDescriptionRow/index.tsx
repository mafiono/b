import React, { FC } from 'react';
import stylesNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Labeled from '@betnomi/libs/components/RangeBar';
import ClockIcon from '@betnomi/libs/assets/img/icons/clock.svg';
import styles from './styles.module.scss';

interface Props {
  active?: boolean;
}

interface RowProps {
  name: string;
  value: string;
  clock?: boolean;
}

const Row: FC<RowProps> = ({ name, value, clock }) => {
  const { t } = useTranslation('profile');
  return (
    <div className={styles.row_wrap}>
      {clock && <img src={ClockIcon} width={12} height={12} alt="clock icon" />}
      <span>{`${t(name)}:`}</span>
      <span className={styles.white_color}>{value}</span>
    </div>
  );
};

const DescriptionRow: FC<Props> = ({ active }) => (
  <div className={stylesNames(styles.wrap, { [styles.active]: active })}>
    <div className={styles.left_panel}>
      <div className={styles.value}>
        <Row name="Wagered" value="$ 183" />
        <Row name="Remaining" value="$ 3817" />
      </div>
      <div className={styles.range}>
        <Labeled />
      </div>
      <div className={styles.info_wrap}>
        <div className={styles.date_wrap}>
          <Row name="Starting time" value="29/06/2021 22:30" clock />
          <Row name="Ending Date" value="30/12/2024 17:05" clock />
        </div>
        <div className={styles.wager_info}>
          <Row name="Time to Wager" value="7 days" />
          <Row name="Wagering Req" value="40x" />
        </div>
        <Row name="Min/Max deposit" value="$ 100 / $ 1000" />
      </div>
    </div>
    <div className={styles.buttons_wrap}>
      <button className={styles.confirm_button}>Claim Bonus</button>
    </div>
  </div>
);

export { DescriptionRow };
