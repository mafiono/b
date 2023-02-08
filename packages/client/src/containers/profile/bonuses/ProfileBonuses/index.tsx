import React, { FC } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Tabs } from '@betnomi/libs/components/tabs/Tabs';
import { useTranslation } from 'react-i18next';
import { TabbedContent } from '../../../../components/common/TabbedContent';
import { Routes } from '../../../../constants/routes';
import { useTabOrder } from '../../../../hooks/useTabOrder';
import { Bonuses } from '../Bonuses';
import { CashBack } from '../CashBack';
import styles from './styles.module.scss';

enum Tab {
  Bonuse = 'bonus',
  CashBacks = 'cashbacks',
}

const tabOrder = [Tab.Bonuse, Tab.CashBacks];

interface Props {}

const ProfileBonuses: FC<Props> = () => {
  const { t } = useTranslation('profile');
  const { params: { subTab } } = useRouteMatch<{ subTab: Tab }>();
  const { active, onTabChange } = useTabOrder(tabOrder, subTab, `${Routes.ProfileRoot}/bonuses`);

  return (
    <Tabs active={active} onChange={onTabChange} controlled>
      <TabbedContent>
        <TabbedContent.Tabs>
          <Tabs.Head>
            <span>{t('Bonus')}</span>
            <span>{t('Cashbacks')}</span>
          </Tabs.Head>
        </TabbedContent.Tabs>

        <TabbedContent.Content className={styles.wrap}>
          <Tabs.Content>
            <Bonuses />
            <CashBack />
          </Tabs.Content>
        </TabbedContent.Content>
      </TabbedContent>
    </Tabs>
  );
};

export { ProfileBonuses };
