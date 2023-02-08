import React, { FC } from 'react';

import styles from './styles.module.scss';
import { playBtn } from '@betnomi/libs/components/GameOverlay/styles.module.scss';
import playIcon from '@betnomi/libs/assets/img/icons/play.svg';
import Button from '@betnomi/libs/components/Button';
import cx from 'classnames';

type IProps = {}

export const bannerCasinoOverlay: FC<IProps> = (item: any) => {
  return (
    <div className={styles.bannerOverlay}>
      <img className={styles.smallImg} src={item.image} alt='small banner image' />
      <div className={styles.bottomBlock}>
        <div>
          <p className={styles.bannerTitle}>{item.title}</p>
          <p className={styles.bannerText}>{item.text}</p>
        </div>
        <button className={playBtn} onClick={() => {}}>
          <img src={playIcon} alt="play btn"/>
        </button>
      </div>
    </div>
  )
}

export const bannerHomeOverlay: FC<IProps> = (item: any) => {
  return (
    <div className={cx(styles.bannerOverlay, styles.homeBanOverlay)}>
      <div className={styles.mainBlock}>
        <div>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.text}>{item.text}</p>
        </div>
        <Button size={52}>Find out more</Button>
      </div>
    </div>
  )
}
