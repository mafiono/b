import React from 'react';
import styles from './styles.module.scss';

export const ShowMore:React.FC = () => (
  <div className={styles.container}>
    <p className={styles.label}>
      Best
      <span className={styles.labelBold}>{' Betnomi '}</span>
      Online Casino
    </p>
    <p className={styles.desc}>
      Lorem ipsum dolor sit, 
      amet consectetur adipisicing, elit.
      Incidunt nihil deserunt ullam eum,
      odio quae laudantium magni consectetur voluptate quidem reiciendis porro dolor are ...
    </p>
    <a href="/#" className={styles.link}>
      Show more
    </a>
  </div>
);
