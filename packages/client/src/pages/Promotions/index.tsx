import React, {FC, useState} from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { LoadMore } from '../Casino/Content/LoadMore';

import { useHistory } from 'react-router-dom';
import { Routes } from '../../constants/routes';
import Button from '@betnomi/libs/components/Button';
import { useTranslation } from '@betnomi/libs/utils/i18n';

import im1 from '@betnomi/libs/assets/img/promotions/Group_67.jpg';
import im2 from '@betnomi/libs/assets/img/promotions/Group_68.jpg';
import styles from './styles.module.scss';

interface IProps {}

export const promotions = [
    {
        id : '12321321',
        img: im1,
        title: 'It’s here! The Betnomi Android & iOS',
        text: 'After months of developing and testing, the new Betnomi Android App has finally landed. We’re talking over 2,600 slots, table games ...'
    },
    {
        id : '143124124',
        img: im2,
        title: 'It’s here! The Betnomi Android & iOS',
        text: 'After months of developing and testing, the new Betnomi Android App has finally landed. We’re talking over 2,600 slots, table games ...'
    },
]

const Promotions: FC<IProps> = () => {
    const { t } = useTranslation('main');
    const history = useHistory();
    const [isMobile, setIsMobile] = useState(false);

    const handleResize = () => {
        const isMobile =  window.matchMedia("(max-width: 768px)").matches;
        setIsMobile(isMobile)
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    // const calculateTimeLeft = () => {
    //     let year = new Date().getFullYear();
    //     let difference = +new Date(`08/23/${year}`) - +new Date();
    //     let timeLeft = {};
    //
    //     if (difference > 0) {
    //       let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    //       let hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    //       let minutes = Math.floor((difference / 1000 / 60) % 60);
    //       let seconds = Math.floor((difference / 1000) % 60);
    //
    //         timeLeft = {
    //             days: days < 10 ? "0" + days : days,
    //             hours: hours < 10 ? "0" + hours : hours,
    //             minutes: minutes < 10 ? "0" + minutes : minutes,
    //             seconds: seconds < 10 ? "0" + seconds : seconds
    //         };
    //     }
    //     return timeLeft;
    // }
    //
    // const [timeLeft, setTimeLeft]: any = useState(calculateTimeLeft());
    // const [year, setYear] = useState(new Date().getFullYear());
    //
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setTimeLeft(calculateTimeLeft());
    //     }, 1000);
    // });
    //
    // const timerComponents: any = [];
    // Object.keys(timeLeft).forEach((interval) => {
    //     if (!timeLeft[interval]) {
    //         return;
    //     }
    //     timerComponents.push(
    //       <span>
    //          {timeLeft[interval]} {interval}{" "}
    //       </span>
    //     );
    // });
    //
    // useEffect(() => {
    //     const timer=setTimeout(() => {
    //         setTimeLeft(calculateTimeLeft());
    //         setYear(new Date().getFullYear());
    //     }, 1000);
    //     // Clear timeout if the component is unmounted
    //     return () => clearTimeout(timer);
    // });

    const handleOpenPromotion = (item: any) => {
        history.push(`${Routes.Promotions}/${item.id}`)
    }


    return (
        <MainLayout isMobile={isMobile}>
            <div className={styles.page}>
                <h1>Promotions</h1>

                {/*<div>*/}
                {/*    <h1>HacktoberFest {year}Countdown</h1>*/}
                {/*    <h2>With React Hooks!</h2>*/}
                {/*    {timerComponents.length ? timerComponents : <span>Time's up!</span>}*/}
                {/*</div>*/}

                <ul className={styles.promotionsList}>
                    {promotions && promotions.map((item, id) => (
                      <li onClick={() => handleOpenPromotion(item)} key={'item ' + id} className={styles.listItem}>
                          <img src={item.img} alt='promotion image' />
                          <div>
                            <p className={styles.itemTitle}>{item.title}</p>
                            <p className={styles.text}>{item.text}</p>

                              <Button className={styles.button} >{t('Read more')}</Button>
                          </div>
                      </li>
                    ))}
                </ul>
                <LoadMore/>
            </div>
        </MainLayout>
    );
}

export { Promotions };