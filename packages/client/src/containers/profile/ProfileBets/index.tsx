import React, { FC } from 'react';
import { Tabs } from '@betnomi/libs/components/tabs/Tabs';
import { useTranslation } from '../../../i18n';
import { TabbedContent } from '../../../components/common/TabbedContent';
import { SportBets } from '../sportbets/SportBets';

import styles from './styles.module.scss';

interface Props {
  isMobile: boolean
}

const ProfileBets: FC<Props> = ({isMobile}) => {
  const { t } = useTranslation('profile');

  return (
    <Tabs>
      <TabbedContent>
        <TabbedContent.Tabs>
          <Tabs.Head>
            <span>{t('My Bets')}</span>
          </Tabs.Head>
        </TabbedContent.Tabs>

        <TabbedContent.Content className={styles.content}>
          <SportBets isMobile={isMobile}/>
        </TabbedContent.Content>
      </TabbedContent>
    </Tabs>
  );
};

export { ProfileBets };
