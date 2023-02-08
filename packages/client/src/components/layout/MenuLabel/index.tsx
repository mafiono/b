import React from 'react';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import styles from './styles.module.scss';

export interface MenuLabelOptions {
  label: string;
  labelShort: string;
  long?: boolean;
}

export const MenuLabel:React.FC<MenuLabelOptions> = ({ label, labelShort, long }) => {
  const { t } = useTranslation('main'); 
  return (
    <div className={styles.label}>
      {long ? t(label) : t(labelShort)}
    </div>
  );
};
