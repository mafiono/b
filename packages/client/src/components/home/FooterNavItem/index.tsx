import React from 'react';
import { Link } from '@betnomi/libs/components';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import styles from './styles.module.scss';

type Props = {
  label: string;
  items: { label: string, to: string }[]
};

export const FooterNavItem: React.FC<Props> = ({ items, label }) => {
  const { t } = useTranslation('main'); 
  return (
    <div>
      <p className={styles.navLabel}>{t(label)}</p>
      <ul className={styles.navGrp}>
        {items.map((el) => (
          <li className={styles.navItem} key={el.label}>
            <Link to={el.to}>
              {t(el.label)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ); 
};
