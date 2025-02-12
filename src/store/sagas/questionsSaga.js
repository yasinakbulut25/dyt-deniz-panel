import { call, put, takeEvery } from 'redux-saga/effects';
import * as endpoints from '@/api/endpoints';
import * as ACTION_TYPES from '@/store/actionTypes';
import { showToast } from '@/components/toast';
import { navigateByWindow } from '@/utils/helpers';

function* fetchQuestionsSaga() {
  try {
    const response = yield call(endpoints.getQuestions);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.FETCH_QUESTIONS.SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_QUESTIONS.ERROR, payload: error.message });
  }
}

function* createQuestionSaga(action) {
  try {
    const response = yield call(endpoints.createQuestion, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.CREATE_QUESTION.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');

    const { hash } = action.payload;
    navigateByWindow(`soru/${hash}`);
  } catch (error) {
    yield put({ type: ACTION_TYPES.CREATE_QUESTION.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

function* updateQuestionSaga(action) {
  const { id: questionID, data } = action.payload;
  try {
    const response = yield call(endpoints.updateQuestion, questionID, data);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.UPDATE_QUESTION.SUCCESS, payload: response });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_QUESTION.ERROR, payload: error.message });
    showToast('error', 'İşlem yapılırken bir hata oluştu!');
  }
}

export default function* blogSaga() {
  yield takeEvery(ACTION_TYPES.FETCH_QUESTIONS.REQUEST, fetchQuestionsSaga);
  yield takeEvery(ACTION_TYPES.CREATE_QUESTION.REQUEST, createQuestionSaga);
  yield takeEvery(ACTION_TYPES.UPDATE_QUESTION.REQUEST, updateQuestionSaga);
}
