import React, {FC, useEffect} from 'react';
import {Link} from "@betnomi/libs/components";
import {Routes} from "../../constants/routes";

import styles from './styles.module.scss';

interface IProps {}

const NotFoundPage: FC<IProps> = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.bsod}>
                <h1 className={styles.neg  + ' ' + styles.title}><span className={styles.bg}>Error - 404</span></h1>
                <h3>An error has occured, to continue:</h3>
                <p>* Return to our homepage.<br/>
                    * Send us an e-mail about this error and try later.</p>
                <nav className={styles.nav}>
                    <Link to={Routes.Homepage} className={styles.link}>index</Link>&nbsp;|&nbsp;
                    <Link to={Routes.Homepage} className={styles.link}>webmaster</Link>
                </nav>
        </div>
        </div>
    );
}

export { NotFoundPage };