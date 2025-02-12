import { call, put, takeEvery } from 'redux-saga/effects';
import * as endpoints from '@/api/endpoints';
import * as ACTION_TYPES from '@/store/actionTypes';
import { showToast } from '@/components/toast';

function* fetchSectionsSaga(action) {
  try {
    const response = yield call(endpoints.getSections, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.FETCH_SECTIONS.SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_SECTIONS.ERROR, payload: error.message });
  }
}

function* updateSectionsSaga(action) {
  const { id: sectionID, data } = action.payload;
  try {
    const response = yield call(endpoints.updateSection, sectionID, data);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.UPDATE_SECTIONS.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_SECTIONS.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

export default function* sectionsSaga() {
  yield takeEvery(ACTION_TYPES.FETCH_SECTIONS.REQUEST, fetchSectionsSaga);
  yield takeEvery(ACTION_TYPES.UPDATE_SECTIONS.REQUEST, updateSectionsSaga);
}
