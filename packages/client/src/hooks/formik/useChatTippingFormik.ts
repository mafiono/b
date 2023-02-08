import { FormikHelpers, useFormik } from 'formik';
import { useCallback, useRef } from 'react';
import { CoinType } from '@betnomi/libs/types';
import {
  boolean, number, object, string, 
} from 'yup';
import { useDispatch } from 'react-redux';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { ChatTippingCallbackErrors } from '../../utils/api/transforms';
import { chatSendTip } from '../../store/chat/actionCreators';
import { useTranslation } from '../../i18n';
import { useChatMinRainAmount } from '../money/useChatMinRainAmount';
import { useUser } from '../useUser';

export interface ChatTippingFormikValues {
  coin: CoinType;
  amount?: number;
  recipientLabel: string;
  recipientValue: string;
  isPrivate: boolean;
}

export const chatTippingInitialValues: ChatTippingFormikValues = {
  coin: CoinType.bitcoin,
  amount: undefined,
  recipientLabel: '',
  recipientValue: '',
  isPrivate: false,
};

const validationSchema = object().shape({
  coin: string().required(),
  amount: number().positive().required(),
  recipientLabel: string().required(),
  recipientValue: string().required(),
  isPrivate: boolean(),
});

export const useChatTippingFormik = (
  values: ChatTippingFormikValues = chatTippingInitialValues,
) => {
  const initialValues = useRef(values);
  const dispatch = useDispatch();
  const { t } = useTranslation('main');
  const { showErrorToast, hideToast } = useToasts();

  const onSubmit = useCallback(
    (
      vals: ChatTippingFormikValues,
      {
        resetForm,
        setErrors,
        setSubmitting,
      }: FormikHelpers<ChatTippingFormikValues>,
    ) => {
      hideToast();

      const cb = (e?: ChatTippingCallbackErrors) => {
        setSubmitting(false);

        if (e) {
          if (e.message) {
            showErrorToast(e.message, t('Error'));
          }

          if (e.fields) {
            setErrors(e.fields);
          }

          return;
        }

        resetForm();
      };

      dispatch(chatSendTip(vals, cb));
    },
    [dispatch, showErrorToast, hideToast],
  );

  const formik = useFormik<ChatTippingFormikValues>({
    initialValues: initialValues.current,
    validationSchema,
    onSubmit,
  });

  const min = useChatMinRainAmount(values.coin);
  const { balances, id } = useUser();
  const onChangePrivate = useCallback(
    (val: boolean) => formik.setFieldValue('isPrivate', val),
    [formik],
  );

  return {
    formik,
    min,
    balances,
    onChangePrivate,
    excludeUser: id.toString(),
  };
};
