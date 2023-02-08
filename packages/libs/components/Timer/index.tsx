import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

const Timer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('01/01/2022') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      timeLeft = { days: days < 10 ? `0${days}` : days,
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft]: any = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });
  return (
    <div className={styles.timer}>
      <div>
        <p className={styles.timer_value}>{timeLeft.days}</p>
        <p className={styles.timer_description}>Days</p>
      </div>
      <p className={classNames(styles.timer_value, styles.seperator)}>:</p>
      <div>
        <p className={styles.timer_value}>{timeLeft.hours}</p>
        <p className={styles.timer_description}>Hours</p>
      </div>
      <p className={classNames(styles.timer_value, styles.seperator)}>:</p>
      <div>
        <p className={styles.timer_value}>{timeLeft.minutes}</p>
        <p className={styles.timer_description}>Mins</p>
      </div>
      <p className={classNames(styles.timer_value, styles.seperator)}>:</p>
      <div>
        <p className={styles.timer_value}>{timeLeft.seconds}</p>
        <p className={styles.timer_description}>Secs</p>
      </div>
    </div>
  );
};

export { Timer };
