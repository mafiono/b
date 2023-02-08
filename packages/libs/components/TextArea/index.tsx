import React, { DetailedHTMLProps, FC, TextareaHTMLAttributes } from 'react';
import { useAutosize } from '../../hooks/ui/useAutosize';
import { TextInputWrap } from '../TextInputWrap';
import styles from './styles.module.scss';

interface IProps
  extends DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
  > {
  autoSize?: boolean;
  hasError?: boolean;
}

const TextArea: FC<IProps> = ({ autoSize, hasError, ...props }) => {
  const ref = useAutosize(!!autoSize);

  return (
    <TextInputWrap className={styles.wrapper}>
      <textarea ref={ref} {...props} maxLength={props.maxLength} />
      {props.maxLength && (
        <div className={styles.limit}>
          {`${props.value?.toString().length} / ${props.maxLength}`}
        </div>
      )}
    </TextInputWrap>
  );
};

export { TextArea };
