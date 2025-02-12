import { call, put, takeEvery } from 'redux-saga/effects';
import * as endpoints from '@/api/endpoints';
import * as ACTION_TYPES from '@/store/actionTypes';
import { showToast } from '@/components/toast';
import { navigateByWindow } from '@/utils/helpers';

function* fetchServicesSaga() {
  try {
    const response = yield call(endpoints.getServices);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.FETCH_SERVICES.SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_SERVICES.ERROR, payload: error.message });
  }
}

function* createServiceSaga(action) {
  try {
    const response = yield call(endpoints.createService, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.CREATE_SERVICE.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');

    const { hash } = action.payload;
    navigateByWindow(`hizmet/${hash}`);
  } catch (error) {
    yield put({ type: ACTION_TYPES.CREATE_SERVICE.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

function* updateServiceSaga(action) {
  const { id: serviceID, data } = action.payload;
  try {
    const response = yield call(endpoints.updateService, serviceID, data);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.UPDATE_SERVICE.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_SERVICE.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

export default function* serviceSaga() {
  yield takeEvery(ACTION_TYPES.FETCH_SERVICES.REQUEST, fetchServicesSaga);
  yield takeEvery(ACTION_TYPES.CREATE_SERVICE.REQUEST, createServiceSaga);
  yield takeEvery(ACTION_TYPES.UPDATE_SERVICE.REQUEST, updateServiceSaga);
}
