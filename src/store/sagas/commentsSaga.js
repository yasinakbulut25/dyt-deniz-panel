import { call, put, takeEvery } from 'redux-saga/effects';
import * as endpoints from '@/api/endpoints';
import * as ACTION_TYPES from '@/store/actionTypes';
import { showToast } from '@/components/toast';
import { navigateByWindow } from '@/utils/helpers';

function* fetchCommentsSaga() {
  try {
    const response = yield call(endpoints.getComments);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.FETCH_COMMENTS.SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_COMMENTS.ERROR, payload: error.message });
  }
}

function* createCommentSaga(action) {
  try {
    const response = yield call(endpoints.createComment, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.CREATE_COMMENT.SUCCESS, payload: response });
    showToast('success', 'Yorum başarıyla oluşturuldu!');

    const { hash } = action.payload;
    navigateByWindow(`yorum/${hash}`);
  } catch (error) {
    yield put({ type: ACTION_TYPES.CREATE_COMMENT.ERROR, payload: error.message });
    showToast('error', 'Yorum oluşturulurken bir hata oluştu!');
  }
}

function* updateCommentSaga(action) {
  const { id: commentID, data } = action.payload;
  try {
    const response = yield call(endpoints.updateComment, commentID, data);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.UPDATE_COMMENT.SUCCESS, payload: response });
    showToast('success', 'Yorum başarıyla güncellendi!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_COMMENT.ERROR, payload: error.message });
    showToast('error', 'Yorum güncellenirken bir hata oluştu!');
  }
}

export default function* commentsSaga() {
  yield takeEvery(ACTION_TYPES.FETCH_COMMENTS.REQUEST, fetchCommentsSaga);
  yield takeEvery(ACTION_TYPES.CREATE_COMMENT.REQUEST, createCommentSaga);
  yield takeEvery(ACTION_TYPES.UPDATE_COMMENT.REQUEST, updateCommentSaga);
}
