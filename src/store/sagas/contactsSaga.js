import { call, put, takeEvery } from 'redux-saga/effects';
import * as endpoints from '@/api/endpoints';
import * as ACTION_TYPES from '@/store/actionTypes';
import { showToast } from '@/components/toast';
import { navigateByWindow } from '@/utils/helpers';

function* fetchContactsSaga() {
  try {
    const response = yield call(endpoints.getContacts);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.FETCH_CONTACTS.SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_CONTACTS.ERROR, payload: error.message });
  }
}

function* createContactSaga(action) {
  try {
    const response = yield call(endpoints.createContact, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.CREATE_CONTACT.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');

    const { hash } = action.payload;
    navigateByWindow(`iletisim/${hash}`);
  } catch (error) {
    yield put({ type: ACTION_TYPES.CREATE_CONTACT.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

function* updateContactSaga(action) {
  const { id: contactID, data } = action.payload;
  try {
    const response = yield call(endpoints.updateContact, contactID, data);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.UPDATE_CONTACT.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_CONTACT.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

export default function* contactSaga() {
  yield takeEvery(ACTION_TYPES.FETCH_CONTACTS.REQUEST, fetchContactsSaga);
  yield takeEvery(ACTION_TYPES.CREATE_CONTACT.REQUEST, createContactSaga);
  yield takeEvery(ACTION_TYPES.UPDATE_CONTACT.REQUEST, updateContactSaga);
}
