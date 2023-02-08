import React from 'react';

import { ModalType } from '../../../../store/modal/types';
import { SportsBetTable } from '../../../../components/profile/SportsBetTable';
import { useModal } from '../../../../hooks/useModal';
import { TransactionAllFormWrap } from '../../../../components/transaction/TransactionAllFormWrap';

import styles from './styles.module.scss';

interface Props {
  isMobile: boolean
}

export const SportBets:React.FC<Props> = ({isMobile}) => {
  const { showModal } = useModal();

  return (
    <>

      {isMobile ? (
          <div onClick={() => {
            showModal(ModalType.SportBetsFilter)()
          }} className={styles.filterBtn}>
            <p>Filter</p>
            <span className={styles.filterAmount}>0</span>
          </div>
      ) : (
          <TransactionAllFormWrap />
      )}

      <div className={styles.tableResponsive}>
        <SportsBetTable />
      </div>
    </>
  );
};
