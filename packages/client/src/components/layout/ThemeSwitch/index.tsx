import React from 'react';
import cx from 'classnames';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { FontIconName } from '@betnomi/libs/components/FontIcon';
import { useTheme } from '@betnomi/libs/hooks/ui/useTheme';
import { ThemeIcon } from '../ThemeIcon';
import styles from './styles.module.scss';

type Prop = {
  long: boolean;
};

export const ThemeSwitch: React.FC<Prop> = ({ long }) => {
  const { toggleTheme, isDark } = useTheme();
  const { t } = useTranslation('main');
  return (
    <button className={styles.out} onClick={toggleTheme}>
      <div className={cx(
        styles.icons, 
        { [styles.long]: long },
      )}
      >
        {(long || !isDark) && <ThemeIcon long={long} icon={FontIconName.Light} active={!isDark} />}
        {(long || isDark) && <ThemeIcon long={long} icon={FontIconName.Dark} active={isDark} />}
      </div>
      {long && (
      <div>
        <p className={styles.theme}>{isDark ? t('Night Mode') : t('Light Mode')}</p>
        <p className={styles.status}>{t('Currently')}</p>
      </div>
      )}
    </button>
  );
};
