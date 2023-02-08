import React, { FC } from 'react';
import { Tabs } from '@betnomi/libs/components/tabs/Tabs';
import { useTranslation } from '../../../../i18n';
import { TabbedContent } from '../../../../components/common/TabbedContent';
import styles from '../../ProfileBets/styles.module.scss';
import { Transaction } from '../Transaction';

interface Props {
  isMobile: boolean
}

const ProfileTransactions: FC<Props> = ({isMobile}) => {
  const { t } = useTranslation('profile');

  return (
    <Tabs>
      <TabbedContent>
        <TabbedContent.Tabs>
          <Tabs.Head>
            <span>{t('Transactions')}</span>
            <span>{t('Deposits')}</span>
            <span>{t('Withdrawals')}</span>
          </Tabs.Head>
        </TabbedContent.Tabs>

        <TabbedContent.Content className={styles.content}>
          <Tabs.Content>
            <Transaction isMobile={isMobile}/>
            <div>CONTENT (TBD)</div>
            <div>CONTENT (TBD)</div>
          </Tabs.Content>
        </TabbedContent.Content>
      </TabbedContent>
    </Tabs>
  );
};

export { ProfileTransactions };
