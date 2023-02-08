import React, {useCallback} from 'react';
import cx from 'classnames';
import { menuItems } from './constants';
import { MenuElement } from '../MenuElement';
import { LanguageSwitch } from '../LanguageSwitch';
import { ThemeSwitch } from '../ThemeSwitch';
import {FontIcon, FontIconName} from "@betnomi/libs/components/FontIcon";
import {Link} from "@betnomi/libs/components";
import {Routes} from "../../../constants/routes";
import {useTranslation} from "../../../i18n";

import styles from './styles.module.scss';
import logo from "@betnomi/libs/assets/img/new-logo.svg";
import home from "@betnomi/libs/assets/img/icons/home.svg";
import inplay from "@betnomi/libs/assets/img/icons/inplay.svg";
import sportBest from "@betnomi/libs/assets/img/icons/sportbets.svg";
import gamesgames from "@betnomi/libs/assets/img/icons/gamesgames.svg";

type Props = {
  menuActive: boolean;
  onMenuToggle?: (val: boolean) => void;
  isMobile?: boolean;
};

export const Menu:React.FC<Props> = ({ menuActive, onMenuToggle = () => {}, isMobile= false }) => {
  const { t } = useTranslation();
  const onMenuClick = useCallback(() => onMenuToggle(!menuActive), [
    menuActive,
    onMenuToggle,
  ]);

  return (
      <nav className={cx(
          styles.nav,
          { [styles.active]: menuActive },
      )}
      >
        {isMobile && (
            <div className={styles.menuHead}>
              <Link to={Routes.Homepage}>
                <img src={logo} alt="Betnomi" height={25} />
              </Link>
              <FontIcon onClick={onMenuClick} name={FontIconName.Close} size={16} />
            </div>
        )}
        <div className={styles.menuContent}>

        {isMobile && (
              <div className={styles.links}>
                <a href="/#" className={styles.active}>
                  <img className={styles.Imgicon} src={home} width={24} height={24} alt=""/>
                  <span>{t('Home')}</span>
                </a>
                <Link to={Routes.Casino}>
                  <FontIcon
                      name={"icon-casino"}
                      size={24}
                      className={cx(styles.icon)}
                  />
                  <span>{t('Casino')}</span>
                </Link>
                <a href="/#">
                  <img className={styles.Imgicon} src={gamesgames} width={24} height={24} alt=""/>
                  <span>{t('Games')}</span>
                </a>
                <a href="/#">
                  <FontIcon
                      name={"icon-roulette"}
                      size={24}
                      className={cx(styles.icon)}
                  />
                  <span>{t('Live Casino')}</span>
                </a>
                <a href="/#">
                  <img className={styles.Imgicon} src={inplay} width={24} height={24} alt=""/>
                  <span>{t('Inplays')}</span>
                </a>
                <a href="/#">
                  <img className={styles.Imgicon} src={sportBest} width={24} height={24} alt=""/>
                  <span>{t('E-Sports')}</span>
                </a>
                <a href="/#">
                  <FontIcon
                      name={"icon-football"}
                      size={24}
                      className={cx(styles.icon)}
                  />
                  <span>{t('Sports')}</span>
                </a>
              </div>
        )}

        <div className={styles.menu}>
          <ul className={styles.scrollable}>
            {menuItems.map((el) => (
                <li key={el.options.label}>
                  <MenuElement
                      el={el}
                      long={menuActive}
                      isMobile={isMobile}
                  />
                </li>
            ))}
          </ul>
          <div className={styles.buttons}>
            {/*<div className={styles.linear} />*/}
            <div className={styles.lang_out}>
              <LanguageSwitch long={menuActive} />
            </div>
            <div className={styles.theme_out}>
              <ThemeSwitch long={menuActive} />
            </div>
          </div>
        </div>

        </div>
      </nav>
  );
}
