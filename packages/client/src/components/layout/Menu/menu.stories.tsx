import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { Menu } from './index';

storiesOf('Layout', module).add('Menu', () => {
  const menuActive = boolean('MenuActive', true);
  return (
    <div style={{
      width: menuActive ? '240px' : '80px',
      position: 'fixed',
      height: '100vh',
      overflow: 'auto', 
      left: '0', 
    }}
    >
      <Menu
        menuActive={menuActive}
      />
    </div>
  );
});
