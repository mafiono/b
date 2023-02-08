import React, { FC } from 'react';
import { Tabs } from '@betnomi/libs/components/tabs/Tabs';
import { useRouteMatch } from 'react-router-dom';
import { useTranslation } from '../../../../i18n';
import { TabbedContent } from '../../../../components/common/TabbedContent';
import { ProfileWalletTipping } from '../ProfileWalletTipping';
import { useTabOrder } from '../../../../hooks/useTabOrder';
import { Routes } from '../../../../constants/routes';
import { ProfileWalletDeposit } from '../ProfileWalletDeposit';
import { ProfileWalletWithdraw } from '../ProfileWalletWithdraw';

enum Tab {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
  Buy = 'buy',
  Tip = 'tip',
}

const tabOrder = [Tab.Deposit, Tab.Withdraw, Tab.Buy, Tab.Tip];

interface Props {
  isMobile: boolean;
}

const ProfileWallet: FC<Props> = ({ isMobile = false }) => {
  const { t } = useTranslation('profile');
  const { params: { subTab } } = useRouteMatch<{ subTab: Tab }>();
  const { active, onTabChange } = useTabOrder(tabOrder, subTab, `${Routes.ProfileRoot}/wallet`);

  return (
    <Tabs active={active} onChange={onTabChange} controlled>
      <TabbedContent>
        <TabbedContent.Tabs>
          {isMobile && (
            <Tabs.Head>
              <span>{t('Deposits')}</span>
              <span>{t('Withdraw')}</span>
              <span>{t('Send a tip')}</span>
            </Tabs.Head>
          )}
          {!isMobile && (
            <Tabs.Head>
              <span>{t('Deposits')}</span>
              <span>{t('Withdraw')}</span>
              <span>{t('Buy crypto')}</span>
              <span>{t('Send a tip')}</span>
            </Tabs.Head>
          )}
        </TabbedContent.Tabs>

        <TabbedContent.Content>
          {!isMobile && (
            <Tabs.Content>
              <ProfileWalletDeposit isMobile={isMobile} />
              <ProfileWalletWithdraw />
              <div>CONTENT (TBD)</div>
              <ProfileWalletTipping />
            </Tabs.Content>
          )}
          {isMobile && (
            <Tabs.Content>
              <ProfileWalletDeposit isMobile={isMobile} />
              <ProfileWalletWithdraw />
              <ProfileWalletTipping />
            </Tabs.Content>
          )}
        </TabbedContent.Content>
      </TabbedContent>
    </Tabs>
  );
};

export { ProfileWallet };
