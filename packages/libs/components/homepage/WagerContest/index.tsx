import React from 'react';
import { Table } from '@betnomi/libs/components/Table'

import Bitcoin from '@betnomi/libs/assets/img/coins/bitcoin.svg';
import Group1 from '@betnomi/libs/assets/img/Group1.png';
import GroupImg from '@betnomi/libs/assets/img/GroupImg.png';
import Avatar from '@betnomi/libs/assets/img/profile/avatar1.png';
import Vector from '@betnomi/libs/assets/img/Vector.svg';

import {columns, data,columnsMobile} from './wegerTableInformation';
import styles from './styles.module.scss';

interface IWagerContest {
  isMobile:boolean
}

const WagerContest = ({isMobile}:IWagerContest) => {
  return (
    <div className={styles.mainContest}>
    <div className={styles.wagerContest}>

      <div className={styles.contest}>
        <div className={styles.headingSection}>
          <h3 className={styles.heading}>Wager Contest</h3>
          <p className={styles.subHeading}>General information about the prizes.</p>
        </div>
        <div className={styles.contestTimer}>
          <div className={styles.bgImage}>
            <img src={GroupImg} alt="icon" className={styles.bgImg} />
          </div>
          <div className={styles.centerCards}>
            <img src={Group1} alt="icon" className={styles.Group} />
          </div>
          <div className={styles.timerTag}>
            <img src={Bitcoin} alt="icon" className={styles.coinImg} />
            <p className={styles.bitcoinHeading}>0.560992 <span className={styles.btc}>BTC</span></p>
          </div>
          <div className={styles.timer}>
            <p className={styles.timerTHeading}>Time Remaining</p>
            <div className={styles.boxes}>
              <p className={styles.timerTime}>Hours</p>
              <p className={styles.timerTimeT}>12</p>
            </div>
            <div className={styles.boxes}>
              <p className={styles.timerTime}>Minutes</p>
              <p className={styles.timerTimeT}>54</p>
            </div>
            <div className={styles.boxes}>
              <p className={styles.timerTime}>Seconds</p>
              <p className={styles.timerTimeT}>12</p>
            </div>
          </div>
        </div>
        <div className={styles.contestPrizePool}>
          <h3 className={styles.dailyHeading}>Daily</h3>
          <h2 className={styles.contestPrize}>Contest Prize Pool</h2>
        </div>
        <div className={styles.myPosition}>
          <div className={styles.columns}>
            <img className={styles.avatarPosition} src={Avatar} alt="profil picture" />
            <span className={styles.tdata}>Monthezoror</span>
          </div>
          <div className={styles.columns}>
            <p className={styles.theading}>My Position</p>
            <span className={styles.tdata}>50th+</span>
          </div>
          <div className={styles.columns}>
            <p className={styles.theading}>Wagered</p>
            <span className={styles.tdata}>$0.03402343</span>
            <img src={Bitcoin} alt="icon" className={styles.coinImg} />
          </div>
          <div className={styles.columns}>
            <p className={styles.theading}>Wager</p>
            <span className={styles.tdata}>$0.03402343</span>
            <img src={Bitcoin} alt="icon" className={styles.coinImg} />
          </div>
          <div className={styles.columns}>
            <p className={styles.theading}>To reach</p>
            <span className={styles.toReach}>top <span className={styles.toReachPosition}>10</span></span>
            
          </div>
        </div>
      </div>
    </div>
      <div className={styles.tableContest}>
        <Table type="secondary" columns={isMobile? columnsMobile :columns} data ={data}/>
      </div>
      </div>
)
}

export default WagerContest;
