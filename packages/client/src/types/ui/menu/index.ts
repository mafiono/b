import { MenuButtonItem } from 'components/layout/LanguageSwitch';
import { MenuLabelOptions } from '../../../components/layout/MenuLabel';
import { MenuLinkOptions } from '../../../components/layout/MenuLink';
import { MenuGroupOptions } from '../../../components/layout/MenuGroup';
import { MenuLineOptions } from '../../../components/layout/MenuLine';

export enum MenuItemType {
  Link = 'link',
  Line = 'line',
  Group = 'group',
  Label = 'label',
  Button = 'button',
}

export type MenuItem = {
  type: MenuItemType.Link,
  options: MenuLinkOptions,
} | {
  type: MenuItemType.Line,
  options: MenuLineOptions,
} | {
  type: MenuItemType.Group,
  options: MenuGroupOptions,
} | {
  type: MenuItemType.Label,
  options: MenuLabelOptions,
} | MenuButtonItem;
