import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes } from '@betnomi/client/src/constants/routes';
import styles from './styles.module.scss';
import { PlayerLevel } from '../../../types/casino/levels';
import { LevelIcon } from '../../LevelIcon';
import { LevelColors, LevelNames } from '../../../constants/levels';
import Link from '../../Link';
import { FontIcon, FontIconName } from '../../FontIcon';

import imgConfirmed from '../../../assets/img/profile/confirmed.svg';
import imgUnconfirmed from '../../../assets/img/profile/unconfirmed.svg';

interface IProps {
  name: string;
  level: PlayerLevel;
  progress: number;
  onLogout: () => void;
  isMobile: boolean;
  confirmed: boolean;
}

const profileLinks: { link: string; title: string; icon: FontIconName }[] = [
  { link: Routes.ProfileRoot, title: 'Profile', icon: FontIconName.User },
  {
    link: `${Routes.ProfileRoot}/wallet`,
    title: 'Wallet',
    icon: FontIconName.Wallet,
  },
  {
    link: `${Routes.ProfileRoot}/bets`,
    title: 'Sports Bets',
    icon: FontIconName.Football,
  },
  {
    link: `${Routes.ProfileRoot}/transactions`,
    title: 'Transactions',
    icon: FontIconName.Transaction,
  },
  { link: `${Routes.ProfileRoot}/vip`, title: 'VIP Lounge', icon: FontIconName.VIP },
  { link: `${Routes.ProfileRoot}/bonuses`, title: 'Bonuses', icon: FontIconName.Promo },
  { link: '/#settings', title: 'Settings', icon: FontIconName.Settings },
];

const UserMenu: FC<IProps> = ({
  name, level, progress, onLogout, isMobile, confirmed
}) => {
  const { t } = useTranslation();
  const confirmedIcon = confirmed ? imgConfirmed : imgUnconfirmed;

  return (
    <div className={styles.menu}>
      <div className={styles.head}>
        <div className={styles.head_name}>
          <div className={styles.name}>
            <img src={confirmedIcon} alt="" />
            <span>{name}</span>
            <LevelIcon level={level} width={24} height={24} />
          </div>

          <div className={styles.spacer} />

          <div className={styles.level} style={{ color: LevelColors[level] }}>
            {LevelNames[level]}
          </div>
        </div>

        <div className={styles.head_progress}>
          <div
            className={styles.progress}
            style={{ color: LevelColors[level] }}
          >
            <div className={styles.bar} style={{ width: `${progress}%` }} />
          </div>
          <div className={styles.percents}>
            <span>{`${progress}%`}</span>

            <div className={styles.spacer} />

            <span>100%</span>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        {profileLinks.map((link) => (
          <Link to={link.link} className={styles.list_item} key={link.link}>
            <FontIcon name={link.icon} size={isMobile ? 24 : 16} />
            <span>{t(link.title)}</span>
          </Link>
        ))}

        <span
          className={styles.list_item}
          onMouseDown={onLogout}
          onKeyDown={onLogout}
          role="button"
          tabIndex={-1}
        >
          <FontIcon name={FontIconName.Logout} size={isMobile ? 24 : 16} />
          <span>{t('Logout')}</span>
        </span>
      </div>
    </div>
  );
};

export { UserMenu };
