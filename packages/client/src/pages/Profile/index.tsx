import React, { FC, useState } from 'react';
import { Tabs } from '@betnomi/libs/components/tabs/Tabs';
import { FontIconName } from '@betnomi/libs/components/FontIcon';
import H4 from '@betnomi/libs/components/H4';
import { useRouteMatch } from 'react-router-dom';
import { IconTab } from '@betnomi/libs/components/tabs/IconTab';
import { useTranslation } from '../../i18n';
import { MainLayout } from '../../layouts/MainLayout';
import styles from './styles.module.scss';
import { ProfileKYC } from '../../containers/profile/kyc/ProfileKYC';
import { ProfileWallet } from '../../containers/profile/wallet/ProfileWallet';
import { ProfileTransactions } from '../../containers/profile/transaction/ProfileTransactions';
import { ProfileBets } from '../../containers/profile/ProfileBets';
import { ProfileBonuses } from '../../containers/profile/bonuses/ProfileBonuses';
import { useTabOrder } from '../../hooks/useTabOrder';
import { Routes } from '../../constants/routes';
import { Authorized } from '../../containers/app/Authorized';
import { TabsSelect } from '../../../../libs/components/TabsSelect';

interface Props {}

enum Tab {
  Profile = 'kyc',
  Wallet = 'wallet',
  Bets = 'bets',
  Transactions = 'transactions',
  VIP = 'vip',
  Bonuses = 'bonuses',
}

const tabOrder = [Tab.Profile, Tab.Wallet, Tab.Bets, Tab.Transactions, Tab.VIP, Tab.Bonuses];

const Profile: FC<Props> = () => {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    const mobile = window.matchMedia('(max-width: 768px)').matches;
    setIsMobile(mobile);
  };
  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const { t } = useTranslation('profile');
  const { params: { tab } } = useRouteMatch<{ tab: Tab }>();
  const { active, onTabChange } = useTabOrder(tabOrder, tab, Routes.ProfileRoot);

  return (
    <Authorized redirect={Routes.Homepage}>
      <MainLayout isMobile={isMobile}>
        <Tabs active={active} onChange={onTabChange} controlled>
          <div className={styles.page}>
            <div className={styles.head}>
              <Tabs.Content>
                <H4>{t('Personal Verification')}</H4>
                <H4>{t('General Settings')}</H4>
                <H4>{t('Sports Bets History')}</H4>
                <H4>{t('General Settings')}</H4>
                <H4>{t('General Settings')}</H4>
                <H4>{t('General Settings')}</H4>
              </Tabs.Content>

              {!isMobile && (
                <div className={styles.tabs}>
                  <Tabs.Head className="mainTabs">
                    <IconTab icon={FontIconName.User}>{t('Profile')}</IconTab>
                    <IconTab icon={FontIconName.Wallet}>{t('Wallet')}</IconTab>
                    <IconTab icon={FontIconName.Football}>{t('Sport Bets')}</IconTab>
                    <IconTab icon={FontIconName.Transaction}>{t('Transactions')}</IconTab>
                    <IconTab icon={FontIconName.VIP}>{t('VIP Lounge')}</IconTab>
                    <IconTab icon={FontIconName.Promo}>{t('Bonuses')}</IconTab>
                  </Tabs.Head>
                </div>
              )}
              {isMobile && (
                <TabsSelect active={active} onChange={onTabChange}>
                  <TabsSelect.Value icon={FontIconName.User} value="Profile" />
                  <TabsSelect.Value icon={FontIconName.Wallet} value="Wallet" />
                  <TabsSelect.Value icon={FontIconName.Football} value="Sport Bets" />
                  <TabsSelect.Value icon={FontIconName.Transaction} value="Transactions" />
                  <TabsSelect.Value icon={FontIconName.VIP} value="VIP Lounge" />
                  <TabsSelect.Value icon={FontIconName.Promo} value="Bonuses" />
                </TabsSelect>
              )}
            </div>
          </div>

          <div className={styles.content}>
            <Tabs.Content>
              <ProfileKYC />
              <ProfileWallet isMobile={isMobile} />
              <ProfileBets isMobile={isMobile} />
              <ProfileTransactions isMobile={isMobile} />
              <span>VIP</span>
              <ProfileBonuses />
            </Tabs.Content>
          </div>
        </Tabs>
      </MainLayout>
    </Authorized>
  );
};

export { Profile };
