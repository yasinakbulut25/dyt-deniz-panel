import { call, put, takeEvery } from 'redux-saga/effects';
import * as endpoints from '@/api/endpoints';
import * as ACTION_TYPES from '@/store/actionTypes';
import { showToast } from '@/components/toast';
import { navigateByWindow } from '@/utils/helpers';

function* fetchGallerySaga() {
  try {
    const response = yield call(endpoints.getGallery);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.FETCH_GALLERY.SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_GALLERY.ERROR, payload: error.message });
  }
}

function* createGallerySaga(action) {
  try {
    const response = yield call(endpoints.createGallery, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.CREATE_GALLERY.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');
    navigateByWindow(`galeri`);
  } catch (error) {
    yield put({ type: ACTION_TYPES.CREATE_GALLERY.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

function* updateGallerySaga(action) {
  const { id: galleryID, data } = action.payload;
  try {
    const response = yield call(endpoints.updateGallery, galleryID, data);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.UPDATE_GALLERY.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_GALLERY.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

export default function* gallerySaga() {
  yield takeEvery(ACTION_TYPES.FETCH_GALLERY.REQUEST, fetchGallerySaga);
  yield takeEvery(ACTION_TYPES.CREATE_GALLERY.REQUEST, createGallerySaga);
  yield takeEvery(ACTION_TYPES.UPDATE_GALLERY.REQUEST, updateGallerySaga);
}
