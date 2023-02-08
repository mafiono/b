import React from 'react';
import cx from 'classnames';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import styles from '../ThemeSwitch/styles.module.scss';

type Prop = {
  icon: FontIconName;
  active: boolean;
  long: boolean;
};

export const ThemeIcon: React.FC<Prop> = ({ icon, active, long }) => (
  <div
    className={cx(
      styles.icon_wrap, 
      { [styles.active]: active },
      { [styles.long]: !long },
    )}
  > 
    <FontIcon
      name={icon} 
      size={16}
      className={styles.icon}
    />
  </div>
);
