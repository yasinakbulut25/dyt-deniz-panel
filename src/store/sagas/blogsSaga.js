import { call, put, takeEvery } from 'redux-saga/effects';
import * as endpoints from '@/api/endpoints';
import * as ACTION_TYPES from '@/store/actionTypes';
import { showToast } from '@/components/toast';
import { navigateByWindow } from '@/utils/helpers';

function* fetchBlogsSaga() {
  try {
    const response = yield call(endpoints.getBlogs);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.FETCH_BLOGS.SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_BLOGS.ERROR, payload: error.message });
  }
}

function* createBlogSaga(action) {
  try {
    const response = yield call(endpoints.createBlog, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.CREATE_BLOG.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');

    const { hash } = action.payload;
    navigateByWindow(`yazi/${hash}`);
  } catch (error) {
    console.log('error :>> ', error);
    yield put({ type: ACTION_TYPES.CREATE_BLOG.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu BEA!');
  }
}

function* updateBlogSaga(action) {
  const { id: blogID, data } = action.payload;
  try {
    const response = yield call(endpoints.updateBlog, blogID, data);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.UPDATE_BLOG.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_BLOG.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

export default function* blogSaga() {
  yield takeEvery(ACTION_TYPES.FETCH_BLOGS.REQUEST, fetchBlogsSaga);
  yield takeEvery(ACTION_TYPES.CREATE_BLOG.REQUEST, createBlogSaga);
  yield takeEvery(ACTION_TYPES.UPDATE_BLOG.REQUEST, updateBlogSaga);
}
