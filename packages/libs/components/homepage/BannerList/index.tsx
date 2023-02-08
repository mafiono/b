import React, { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Pagination,
  Autoplay, SwiperOptions,
} from 'swiper/core';
import { PaginationOptions } from 'swiper/types/components/pagination';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import styles from './styles.module.scss';

export interface  Banner {
  image: string,
  link: string
  title?: string
  text?: string
}

interface Props {
  banners: Banner[]
  autoplay?: boolean
  delay?: number
  withPagination?: boolean,
  items: number,
  breakpoints?: SwiperOptions['breakpoints']
  children?: (item: any) => void
  overlay?: any,
}

SwiperCore.use([Pagination, Autoplay]);

const pagination: PaginationOptions = {
  clickable: true,
  bulletClass: styles.bullet,
  bulletActiveClass: styles.active,
  modifierClass: `${styles.pagination} `,
};

const BannerList: FC<Props> = ({
  banners,
  autoplay,
  delay = 5000,
  withPagination = false,
  items,
  breakpoints,
  overlay,
  ...props
}) => (
  <div className={styles.wrapper}>
    <Swiper
      slidesPerView={items}
      spaceBetween={30}
      pagination={withPagination ? pagination : false}
      autoplay={autoplay ? { delay } : false}
      className={withPagination ? styles.pagination_padding : ''}
      breakpoints={breakpoints}
      observeParents
      resizeObserver
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.image}>
          <img className={styles.banner} src={banner.image} alt="banner" />
          {overlay(banner)}
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default BannerList;
