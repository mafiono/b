import React from 'react';
import { MenuItemType, MenuItem } from '../../../types/ui/menu';
import { MenuLabel } from '../MenuLabel';
import { MenuLink } from '../MenuLink';
import { MenuLine } from '../MenuLine';
import { MenuGroup } from '../MenuGroup';

type Prop = {
  el: MenuItem;
  long: boolean;
  isMobile: boolean;
};

export const MenuElement:React.FC<Prop> = ({ el, long, isMobile }) => {
  switch (el.type) {
    case MenuItemType.Label: {
      return (
        <MenuLabel
          label={el.options.label}
          labelShort={el.options.labelShort}
          long={long}
        />
      );
    }
    case MenuItemType.Link: {
      return (
        <MenuLink
          long={long} 
          icon={el.options.icon}
          label={el.options.label}
          to={el.options.to}
        />
      );
    }
    case MenuItemType.Group: {
      return (
        <MenuGroup
          long={long}
          icon={el.options.icon}
          label={el.options.label}
          items={el.options.items}
          isMobile={isMobile}
        />
      );
    }
    case MenuItemType.Line: {
      return <MenuLine />;
    }
    default: 
      return null;
  }
};
