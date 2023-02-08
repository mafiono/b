import React, {FC, useState} from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import Games from '../../containers/homepage/Games';
import styles from './styles.module.scss';

interface IProps {}

const Homepage: FC<IProps> = () => {
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

    return (
        <MainLayout isMobile={isMobile}>
            <div className={styles.page}>
                <Games isMobile={isMobile}/>
            </div>
        </MainLayout>
    );
}

export { Homepage };