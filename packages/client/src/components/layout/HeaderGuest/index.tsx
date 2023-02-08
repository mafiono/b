import React, { FC, useCallback } from 'react';
import Button from '@betnomi/libs/components/Button';
import { ButtonColor } from '@betnomi/libs/types';
import { FontIconName } from '@betnomi/libs/components/FontIcon';
import { useTranslation } from '../../../i18n';
import { HeaderToggleButton } from '../HeaderToggleButton';
import styles from './styles.module.scss';

interface IProps {
  onChatToggle: (val: boolean) => void;
  active: boolean;
  onOpenSignInModal: () => void;
  onOpenSignUpModal: () => void;
  isMobile?: boolean;
  isSmallDesktop?:boolean;
  onMenuToggle?: (val: boolean) => void;
  menuActive?: boolean;
}

const HeaderGuest: FC<IProps> = ({
  active, onChatToggle, onOpenSignInModal, onOpenSignUpModal, isMobile = false,isSmallDesktop,onMenuToggle,menuActive
}) => {
  const { t } = useTranslation();
  const onClick = useCallback(() => onChatToggle(!active), [
    active,
    onChatToggle,
  ]);
  const onClickSmallDesktop = useCallback(() => {
    if (menuActive) {
      // @ts-ignore
      onMenuToggle(!menuActive)
    }
    onChatToggle(!active)

    //  onMenuToggle(!menuActive)
    // onChatToggle(!active)
  }, [
    active,
    onChatToggle,
  ]);

  return (
    <div className={styles.buttons}>
      {!isMobile && (
          <HeaderToggleButton active={active} onClick={isSmallDesktop?onClickSmallDesktop :onClick} icon={FontIconName.Chat} />
      )}

      <Button color={ButtonColor.Secondary} onClick={isSmallDesktop?onClickSmallDesktop:onOpenSignInModal}>{t('Sign in')}</Button>
      <Button color={ButtonColor.Primary} onClick={onOpenSignUpModal}>{t('Sign up')}</Button>
    </div>
  );
};

export { HeaderGuest };
