import { FontIconName } from '@betnomi/libs/components/FontIcon';
import { MenuItem, MenuItemType } from '../../../../types/ui/menu';

export const menuItems:MenuItem[] = [
  {
    type: MenuItemType.Label,
    options: {
      label: 'Sport',
      labelShort: 'Sport',
      long: false,
    },
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/live-sports',
      label: 'Live Sports',
      icon: FontIconName.LiveCasinoPlay,
    },
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/starting-soon',
      label: 'Starting Soon',
      icon: FontIconName.Football,
    },
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/boosted-odds',
      label: 'Boosted Odds',
      icon: FontIconName.OddsNew,
    },
  },
  // NEXT GROUP
  {
    type: MenuItemType.Label,
    options: {
      label: 'Casino and Live',
      labelShort: 'Casino',
      long: true,
    },
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/slots',
      label: 'Slots',
      icon: FontIconName.Casino,
    },
  },
  {
    type: MenuItemType.Link,
    options: {
      to: 'poker',
      label: 'Poker Room',
      icon: FontIconName.Poker,
    },
  },
  {
    type: MenuItemType.Group,
    options: {
      label: 'All Live Games',
      icon: FontIconName.Roulette,
      items: [
        {
          type: MenuItemType.Link,
          options: {
            to: '/#',
            label: 'Text1',
          },
        },
        {
          type: MenuItemType.Link,
          options: {
            to: '/#',
            label: 'Text2',
          },
        },
      ],
    },
  },
  {
    type: MenuItemType.Group,
    options: {
      label: 'House Games',
      icon: FontIconName.House,
      items: [
        {
          type: MenuItemType.Link,
          options: {
            to: '/#',
            label: 'Text3',
          },
        },
        {
          type: MenuItemType.Link,
          options: {
            to: '/#',
            label: 'Text4',
          },
        },
      ],
    },
  },
  {
    type: MenuItemType.Group,
    options: {
      label: 'Virtuals',
      icon: FontIconName.Virtuals,
      items: [
        {
          type: MenuItemType.Link,
          options: {
            to: 'virtuals',
            label: 'Text5',
          },
        },
        {
          type: MenuItemType.Link,
          options: {
            to: '/#',
            label: 'Text6',
          },
        },
      ],
    },
  },
  {
    type: MenuItemType.Line,
    options: {
      label: 'line1',
    },
  },
  // NEXT GROUP
  {
    type: MenuItemType.Link,
    options: {
      to: '/vip-lounge',
      label: 'VIP Lounge',
      icon: FontIconName.VIP,
    },
  },
  {
    type: MenuItemType.Link,
    options: {
      to: 'tournaments',
      label: 'Tournaments',
      icon: FontIconName.Tournaments,
    },
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/promotions',
      label: 'Promotions',
      icon: FontIconName.Promo,
    },
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/affiliates',
      label: 'Affiliates',
      icon: FontIconName.Affiliates,
    },
  },
  {
    type: MenuItemType.Link,
    options: {
      to: '/support',
      label: 'Support',
      icon: FontIconName.Support,
    },
  },
];
