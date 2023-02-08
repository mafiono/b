import React, { useMemo } from 'react';
import {
  localeNames,
} from '@betnomi/libs/utils/i18n';
import { keys } from 'ramda';
import { MenuItemType } from '../../../types/ui/menu';
import { useLocale } from '../../../hooks/useLocale';
import { MenuGroup } from '../MenuGroup';
import styles from './styles.module.scss';

type Prop = {
  long: boolean;
};

type MenuButtonOptions = {
  label: string;
  onClick: () => void;
};

export type MenuButtonItem = {
  type: MenuItemType.Button,
  options: MenuButtonOptions;
};

export const LanguageSwitch:React.FC<Prop> = ({ long }) => {
  const {
    shortLabel, label, setLocale,
  } = useLocale();

  const items = useMemo<MenuButtonItem[]>(() => keys(localeNames).map((loc) => ({
    type: MenuItemType.Button,
    options: {
      label: localeNames[loc],
      onClick: setLocale(loc),
    },
  })), [setLocale]);

  return (
    <MenuGroup
      label={label}
      shortLabel={shortLabel}
      classNameContainer={styles.out}
      classNameLabel={styles.text}
      long={long}
      showArrow={!!long}
      items={items}
    />
  );
};
