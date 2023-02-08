import React, { FC, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Tabs } from '@betnomi/libs/components/tabs/Tabs';
import styles from './styles.module.scss';
import { IconTab } from '@betnomi/libs/components/tabs/IconTab';
import { TabsSelect } from '../../TabsSelect';
import { FontIconName } from '@betnomi/libs/components/FontIcon';
import { useTabOrder } from '../../../../client/src/hooks/useTabOrder';
import { Table } from '@betnomi/libs/components/Table';
import { Routes } from '@betnomi/client/src/constants/routes';
import { Authorized } from '@betnomi/client/src/containers/app/Authorized';
import WagerContest from '../WagerContest';
import { data,columns,columnsMobile } from './betsTableInformation';

interface GameProvider {
  isMobile:boolean
}

enum Tab {
  Profile = 'kyc',
  Wallet = 'wallet',
  Bets = 'bets',
  Transactions = 'transactions',
  VIP = 'vip',
  Bonuses = 'bonuses',
}

const tabOrder = [Tab.Profile, Tab.Wallet, Tab.Bets];

const GameProvider = ({isMobile}:GameProvider) => {
  const { params: { tab } } = useRouteMatch<{ tab: Tab }>();
  const [active,setActive] = useState(0)
  // const { active, onTabChange } = useTabOrder(tabOrder, tab, Routes.ProfileRoot);
  const onTabChange = (a:any) =>{
    console.log({a})
    setActive(a)
  }
  return (
    <Tabs active={active} onChange={onTabChange} controlled>
      <div className={styles.page}>
        <div className={styles.head}>
          {!isMobile && (
            <div className={styles.tabs}>
              <Tabs.Head className={styles.mainTab}>
                <h4 className={styles.heading}>Latest Bets</h4>
                <h4 className={styles.heading}>High Rollers</h4>
                <h4 className={styles.heading}>Wager Contest</h4>
              </Tabs.Head>
            </div>
          )}
          {isMobile && (
            <div className={styles.mobileTabs}>
            <Tabs.Head className={styles.mainTab}>
              <h4 className={styles.heading}>Latest Bets</h4>
              <h4 className={styles.heading}>Casino</h4>
              <h4 className={styles.heading}>Sports</h4>
            </Tabs.Head>
          </div>
          )}
        </div>
      </div>

      <div>
        <Tabs.Content>
          <Table data={data} columns={isMobile? columnsMobile:columns} />
          <Table data={data} columns={isMobile? columnsMobile:columns} />
          {isMobile? <div>Sports Screen</div>:<WagerContest isMobile={isMobile}/>}
        </Tabs.Content>
      </div>
    </Tabs>
  )
}

export default GameProvider;