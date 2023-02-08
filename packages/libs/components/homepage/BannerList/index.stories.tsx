import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';
import BannerList, { Banner } from './index';

const banners: Banner[] = [
  { image: 'https://picsum.photos/600/260', link: '#' },
  { image: 'https://picsum.photos/600/270', link: '#' },
  { image: 'https://picsum.photos/600/280', link: '#' },
  { image: 'https://picsum.photos/600/290', link: '#' },
];

storiesOf('Basic', module).add('BannerList', () => {
  const autoplay = boolean('Autoplay', true);
  const delay = number('Delay', 5000);
  const withPagination = boolean('With pagination', true);
  const items = number('Items', 3);

  return (
    <BannerList
      banners={banners}
      autoplay={autoplay}
      delay={delay}
      withPagination={withPagination}
      items={items}
    />
  );
});
