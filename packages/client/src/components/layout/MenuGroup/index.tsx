import React, { useMemo } from 'react';
import cx from 'classnames';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { Manager, Popper, Reference } from 'react-popper';
import { useFocusEvent } from '@betnomi/libs/hooks/useFocusEvent';
import { usePopperDropdown } from '@betnomi/libs/hooks/ui/usePopperDropdown';
import { MenuItemType } from '../../../types/ui/menu';
import { MenuLink, MenuLinkOptions } from '../MenuLink';
import { PopperUpdater } from '../PopperUpdater';
import { MenuButtonItem } from '../LanguageSwitch';
import styles from './styles.module.scss';

type Item = {
  type: MenuItemType.Link
  options: MenuLinkOptions;
} | MenuButtonItem;

export interface MenuGroupOptions {
  icon?: FontIconName;
  label: string;
  long?: boolean;
  items: Item[];
  classNameContainer?: string;
  classNameLabel?: string;
  showArrow?: boolean;
  shortLabel?: string;
  isMobile?: boolean;
}

const POPPER_OFFSET_LONG = 40;
const POPPER_OFFSET_SHORT = 30;

export const MenuGroup:React.FC<MenuGroupOptions> = ({
  icon, long, label, items,
  classNameContainer,
  classNameLabel,
  showArrow = long,
  shortLabel,
  isMobile,
}) => {
  const { t } = useTranslation('main');
  const title = t(label);
  const {
    focused, onBlur, onFocus,
  } = useFocusEvent();

  const modifiers = usePopperDropdown(0, long ? POPPER_OFFSET_LONG : POPPER_OFFSET_SHORT);
  const deps = useMemo(() => [long], [long]);

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
            <>
              <button
                  className={cx(
                      styles.button,
                      { [styles.active]: !long },
                      classNameContainer,
                  )}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  ref={ref}
              >
                <div className={styles.text_wrap}>
                  {icon && (
                      <FontIcon
                          name={icon}
                          size={long ? 16 : 24}
                          className={cx(styles.icon)}
                      />
                  )}
                  <span className={cx(styles.text,  { [styles.active]: long }, classNameLabel)}>
                {title}
              </span>
                      {!long && (
                          <span className={styles.short_label}>
                {shortLabel}
              </span>
                      )}
                    </div>
                    {showArrow && (
                        <div className={styles.arrow}>
                          <FontIcon
                              name={FontIconName.IconArrowBottom}
                              size={12}
                          />
                        </div>
                    )}
                  </button>

                  {isMobile && (
                      <ul
                          className={cx(styles.items, {[styles.hidden]: !focused})}
                      >
                        {items.map((item) => {
                          if (item.type === MenuItemType.Button) {
                            return (
                                <button
                                    key={item.options.label}
                                    onMouseDown={item.options.onClick}
                                    className={styles.button_lang}
                                >
                                  {item.options.label}
                                </button>
                            );
                          }
                          return (
                              <MenuLink
                                  long
                                  key={item.options.label}
                                  to={item.options.to}
                                  label={item.options.label}
                              />
                          );
                        })}
                      </ul>
                  )}
                </>

            )}
          </Reference>

          {!isMobile && (
              <Popper placement="right-start" modifiers={modifiers}>
                {({
                    ref, style, update,
                  }) => (
                    <PopperUpdater
                        update={update}
                        deps={deps}
                        delay={300}
                    >
                      <ul
                          className={cx(styles.items, {[styles.hidden]: !focused})}
                          ref={ref}
                          style={style}
                      >
                        {items.map((item) => {
                          if (item.type === MenuItemType.Button) {
                            return (
                                <button
                                    key={item.options.label}
                                    onMouseDown={item.options.onClick}
                                    className={styles.button_lang}
                                >
                                  {item.options.label}
                                </button>
                            );
                          }
                          return (
                              <MenuLink
                                  long
                                  key={item.options.label}
                                  to={item.options.to}
                                  label={item.options.label}
                              />
                          );
                        })}
                      </ul>
                    </PopperUpdater>
                )}
              </Popper>
          )}
        </Manager>
    );
};
