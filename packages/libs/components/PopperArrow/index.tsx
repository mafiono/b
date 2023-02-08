import React, { FC } from 'react';
import { PopperArrowProps } from 'react-popper';
import styles from './styles.module.scss';

interface IProps {
  props: PopperArrowProps
}

const PopperArrow: FC<IProps> = ({ props }) => (
  <div ref={props.ref} style={props.style} className={styles.arrow} data-popper-arrow>
    <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0L12 6H0L6 0Z" />
    </svg>
  </div>
);

export { PopperArrow };
