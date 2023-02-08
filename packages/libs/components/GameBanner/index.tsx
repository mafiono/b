import React, { FC } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

interface Props {
  image: string
  name: string
  className?: string
  width?: number
  height?: number
  imageClassname?: string
  game: object,
}

const GameBanner: FC<Props> = ({
  image,
  name,
  className,
  height,
  width,
  imageClassname,
}) => (
  <div className={cx(styles.banner, className)}>
    <img
      className={imageClassname}
      src={image}
      alt={name}
      width={width}
      height={height}
    />
  </div>
);

export default GameBanner;
