import React, { FC } from 'react';
import classNames from 'classnames';
import { Manager, Popper, Reference } from 'react-popper';
import { PlayerLevel } from '../../../types/casino/levels';
import { UserImage } from '../../UserImage';
import { UserMenu } from '../UserMenu';
import { useFocusEvent } from '../../../hooks/useFocusEvent';
import { usePopperDropdown } from '../../../hooks/ui/usePopperDropdown';
import { LevelBadge } from '../../LevelBadge';
import { PopperArrow } from '../../PopperArrow';
import styles from './styles.module.scss';
import imgConfirmed from '../../../assets/img/profile/confirmed.svg';
import imgUnconfirmed from '../../../assets/img/profile/unconfirmed.svg';

export interface UserWidgetProps {
  level: PlayerLevel;
  name: string;
  progress: number;
  image: string;
  confirmed: boolean;
  onLogout: () => void;
  isMobile: boolean;
}

const UserWidget: FC<UserWidgetProps> = ({
  level,
  name,
  progress,
  image,
  confirmed,
  onLogout,
  isMobile= false
}) => {
  const confirmedIcon = confirmed ? imgConfirmed : imgUnconfirmed;
  const {
    focused, onBlur, onFocus,
  } = useFocusEvent();

  const modifiers = usePopperDropdown(0, 30);

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <button className={styles.widget} onFocus={onFocus} onBlur={onBlur} ref={ref}>
            <UserImage image={image} progress={progress} level={level} size={44} />

            {!isMobile && (
                <div className={styles.info}>
                  <div className={styles.name}>
                    <span>{name}</span>
                    <img src={confirmedIcon} alt="" />
                  </div>

                  <LevelBadge level={level} />
                </div>
            )}

          </button>
        )}
      </Reference>

      {focused && (
          <Popper placement="bottom" modifiers={modifiers}>
            {({
                ref, style, arrowProps,
              }) => (
                <div
                    className={classNames(styles.floating, { [styles.hidden]: !focused })}
                    ref={ref}
                    style={style}
                >
                  <PopperArrow props={arrowProps} />
                  <UserMenu confirmed={confirmed} isMobile={isMobile} name={name} level={level} progress={progress} onLogout={onLogout} />
                </div>
            )}
          </Popper>
      )}

    </Manager>
  );
};

export { UserWidget };
