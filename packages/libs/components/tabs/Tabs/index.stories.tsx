import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs/dist';
import { action } from '@storybook/addon-actions';
import { Tabs } from '.';

storiesOf('Basic', module).add('Tabs', () => {
  const controlled = boolean('Controlled', false);
  const active = number('Active', 0);
  const onChange = action('onChange');

  return (
    <div style={{ width: 400 }}>
      <Tabs active={active} onChange={onChange} controlled={controlled}>
        <Tabs.Head>
          <div>first</div>
          <div>second</div>
          <div>third</div>
        </Tabs.Head>
        <div>
          <Tabs.Content>
            <div>
              <Tabs active={active} onChange={onChange} controlled={controlled}>
                <Tabs.Head>
                  <div>first nested</div>
                  <div>second nested</div>
                  <div>third nested (no content)</div>
                </Tabs.Head>
                <div>
                  <Tabs.Content>
                    <div>first nested page</div>
                    <div>second nested page</div>
                  </Tabs.Content>
                </div>
              </Tabs>
            </div>
            <div>second page</div>
            <div>third page</div>
          </Tabs.Content>
        </div>
      </Tabs>
    </div>
  );
});
