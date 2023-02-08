import { call, put, select } from 'redux-saga/effects';
import { profileSetBasic, profileSubmitBasic } from '../actionCreators';
import { profileGetKYC, profileKYCCreate, profileKYCUpdate } from '../api';
import { ProfileKYCCreateRequest } from '../types';
import { profileBasicErrorToErrors } from '../../../utils/api/transforms';
import { Unwrap } from '../../../types/unwrap';
import { Gender } from '../../../constants/gender';
import { ProfileKYCBasicFormikValues } from '../../../hooks/formik/useProfileKYCBasicForm';
import { ProfileState } from '../../../types/store/profile';

export function* profileSubmitBasicSaga({
  payload: {
    values,
    callback,
  },
}: ReturnType<typeof profileSubmitBasic>) {
  try {
    yield put(profileSetBasic(values));
    
    const data: ProfileKYCCreateRequest = {
      firstName: values.name,
      lastName: values.surname,
      birthDay: values.date,
      address: values.street,
      region: values.area,
      gender: values.gender?.toLowerCase() || '',
      zipCode: values.zipCode,
      city: values.city,
      country: values.country,
    };

    const state: ProfileState['basic'] = yield select();
    
    if (state.isLoaded) {
      yield call(profileKYCUpdate, data);
    } else {
      yield call(profileKYCCreate, data);
      yield put(profileSetBasic({ isLoaded: true }));
    }
    
    callback();
  } catch (e) {
    callback(profileBasicErrorToErrors(e.response.data));
  }
}

export function* profileGetBasicSaga() {
  try {
    const { data }: Unwrap<typeof profileGetKYC> = yield call(profileGetKYC);
    const parsedData: ProfileKYCBasicFormikValues = {
      name: data.firstName,
      surname: data.lastName,
      date: data.birthDay,
      street: data.address,
      area: data.region,
      zipCode: data.zipCode,
      country: data.country,
      city: data.city,
      gender: data.gender.charAt(0).toUpperCase() + data.gender.slice(1) as Gender,
    };
    yield put(profileSetBasic({ ...parsedData, isLoaded: true }));
  } catch (e) {
    yield put(profileSetBasic({ isLoaded: false }));
  }
}
