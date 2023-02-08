import React, { FC } from 'react';
import { FontIcon, FontIconName } from '../../FontIcon';
import styles from './styles.module.scss';

interface Props {
  icon: FontIconName
}

const IconTab: FC<Props> = ({ children, icon }) => (
  <div className={styles.tab}>
    <FontIcon name={icon} size={24} />
    <span>{children}</span>
  </div>
);

export { IconTab };
