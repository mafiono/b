import React from 'react';

import { ModalType } from '../../../../store/modal/types';
import { useModal } from '../../../../hooks/useModal';

import styles from './styles.module.scss';
import { TransactionAll } from '../TransactionAll';
import { TransactionAllTable } from '../../../../components/transaction/TransactionAllTable';
import { useShallowSelector } from '../../../../hooks';
import { selectProfileTransactionAll } from '../../../../store/profile/selectors';

interface Props {
  isMobile: boolean
}

export const Transaction:React.FC<Props> = ({isMobile}) => {
  const { showModal } = useModal();
  const { list } = useShallowSelector(selectProfileTransactionAll);

  return (
    <>

      {isMobile ? (
          <div onClick={() => {
            showModal(ModalType.TransactionFilter)()
          }} className={styles.filterBtn}>
            <p>Filter</p>
            <span className={styles.filterAmount}>0</span>
          </div>
      ) : (
          <TransactionAll />
      )}

      <div className={styles.tableResponsive}>
        <TransactionAllTable list={list} />
      </div>
    </>
  );
};
