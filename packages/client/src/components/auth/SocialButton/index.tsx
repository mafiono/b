import React, {
  ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren, 
} from 'react';

import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import cx from 'classnames';
import metamask from '@betnomi/libs/assets/img/metamask.svg';
import { SocialRegisterButtons } from '../../../types/store/auth';
import styles from './styles.module.scss';

const socialButtonIcons: Record<SocialRegisterButtons,
FontIconName> = {
  [SocialRegisterButtons.Facebook]: FontIconName.Facebook,
  [SocialRegisterButtons.Metamask]: FontIconName.Telegram,
  [SocialRegisterButtons.Google]: FontIconName.Google,
  [SocialRegisterButtons.Telegram]: FontIconName.Telegram,
};

type SocialButtonProp = DetailedHTMLProps<
ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement
> & {
  typeButton: SocialRegisterButtons;
  onClick?: () => void;
  innerRef?: React.RefObject<HTMLButtonElement>
};

export const SocialButton: React.FC<PropsWithChildren<SocialButtonProp>> = ({
  typeButton, onClick, children, innerRef, ...rest
}) => (
  <button 
    {...rest}
    className={cx(styles.button, styles[typeButton])}
    type="button"
    onClick={onClick}
    ref={innerRef}
  >
    {typeButton !== SocialRegisterButtons.Metamask ?
      <FontIcon name={socialButtonIcons[typeButton]} className={styles.icon_bg} /> :
      <img src={metamask} alt="icon" className={styles.img} />}
    {children}
  </button>
);
