import React from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import CoinsContainer from '../../layout/CoinsContainer';
import { FooterNav } from '../FooterNav';
import styles from './styles.module.scss';

import logo from '@betnomi/libs/assets/img/new-logo.svg';
import shield from '@betnomi/libs/assets/img/shield.svg';
import shield18 from '@betnomi/libs/assets/img/shield18.svg';
import gambling from '@betnomi/libs/assets/img/Responsible_Gambling.svg';
import bitcoin from '@betnomi/libs/assets/img/coins/bitcoin.svg';
import {CoinType} from "@betnomi/libs/types";

type Props = {
    rates?: Partial<Record<CoinType, number>>;
    isMobile: boolean;
};

export const Footer:React.FC<Props> = ({rates = {}, isMobile= false}) => {

    const formattedPrice = (num: number): string => {
        const priceArr = String(num).split('.');
        priceArr[1] = priceArr[1].substr(0,2)

        return priceArr.join(".")
    }

    return(
        <footer className={styles.footer}>
            <div className={styles.coins}>
                <CoinsContainer isMobile={isMobile}/>
            </div>
            <FooterNav />
            <div className={styles.footer_desc}>
                <img className={styles.logo} alt="logo" src={logo} />
                <p className={styles.footer_text}>
                    Betnomi.com is operated by Native Media B.V.
                    (Registered address, Fransche Bloemweg 4, Willemstad,
                    Curacao). A company licensed and regulated by the law of
                    Curacao under the Master License Holder with license number
                    1668/JAZ.
                </p>
                <div className={styles.desc_img_wrap}>
                    <img className={styles.gambling} alt="gambling" src={gambling} />
                    <img alt="shield18+" className={styles.shield} src={shield18} />
                    <img alt="shield" className={styles.shield} src={shield} />
                </div>
            </div>

            <div className={styles.footer_bottom}>
                <div className={styles.btc_rates}>
                    <img
                        src={bitcoin}
                        alt="bitcoin"
                        width={16}
                        height={16}
                    />
                    {rates.BTC && (
                        <p>1 BTC = {formattedPrice(rates.BTC)}</p>
                    )}

                </div>
                <div>
                    <a className={styles.social} href="/#">
                        <FontIcon name={FontIconName.Facebook} size={24} />
                    </a>
                    <a className={styles.social} href="/#">
                        <FontIcon name={FontIconName.Instagram} size={24} />
                    </a>
                    <a className={styles.social} href="/#">
                        <FontIcon name={FontIconName.Twitter} size={24} />
                    </a>
                    <a className={styles.social} href="/#">
                        <FontIcon name={FontIconName.Telegram} size={24} />
                    </a>
                </div>
                <p className={styles.copyright}>© 2021 Betnomi</p>
            </div>
        </footer>
    );
}
