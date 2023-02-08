import { toast, ToastOptions, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames';
import { ToastContent } from 'react-toastify/dist/types';
import React, { FC } from 'react';
import styles from './styles.module.scss';
import { FontIcon, FontIconName } from '../FontIcon';

const Content: FC<{ text: string; title?: string }> = ({ title, text }) => (
  <div className={styles.content}>
    {!!title && <div className={styles.title}>{title}</div>}
    <div className={styles.text}>{text}</div>
  </div>
);

const Close: FC = () => (
  <button className={styles.close}>
    <FontIcon name={FontIconName.Close} size={16} />
  </button>
);

toast.configure({
  position: (window && window.matchMedia("(max-width: 768px)").matches) ? 'top-center' :'bottom-left',
  hideProgressBar: true,
  closeOnClick: true,
  toastClassName: (context) =>
    classNames(styles.toast, !!context?.type && styles[context.type]),
  bodyClassName: styles.body,
  closeButton: <Close />,
  autoClose: 3000,
});

const showToast = (
  content: ToastContent,
  type: TypeOptions = 'info',
  options?: ToastOptions,
) =>
  toast(content, {
    type,
    ...(options || {}),
  });

const showSuccessToast = (
  text: string,
  title?: string,
  options?: ToastOptions,
) => showToast(<Content text={text} title={title} />, 'success', options);

const showErrorToast = (text: string, title?: string, options?: ToastOptions) =>
  showToast(<Content text={text} title={title} />, 'error', options);

const hideToast = (id?: string | number) => toast.dismiss(id);

export {
  showToast, showSuccessToast, showErrorToast, hideToast,
};
