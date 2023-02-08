import React from 'react';
import cx from 'classnames';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';

export interface MenuLinkOptions {
  icon?: FontIconName;
  to: string;
  label: string;
  long?: boolean;
}

export const MenuLink:React.FC<MenuLinkOptions> = ({
  icon, to, label, long, 
}) => (
  <NavLink to={to} activeClassName={styles.activeLink} className={cx(styles.link, { [styles.active]: !long })}>
    {icon && (
      <FontIcon
        name={icon}
        size={long ? 16 : 24}
        className={cx(styles.icon, { [styles.active]: long })}
      />
    )}
    <span className={cx(
      styles.text, 
      { [styles.active]: long },
    )}
    >
      {label}
    </span>
  </NavLink>
);
