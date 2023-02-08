import React from 'react';
import { Modal } from '../../../components/modal/Modal';
import { MainRouter } from '../MainRouter';
import { useScript } from '../../../hooks/useScript';
import { ScrollToTop } from '../../../components/common/ScrollToTop';

const App = () => {
  useScript('https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js');

  return (
    <>
      <ScrollToTop/>
      <Modal />
      <MainRouter />
    </>
  );
}

export { App };
