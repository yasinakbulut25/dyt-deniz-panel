import { call, put, takeEvery } from 'redux-saga/effects';
import * as endpoints from '@/api/endpoints';
import * as ACTION_TYPES from '@/store/actionTypes';
import { signIn } from 'next-auth/react';
import { showToast } from '@/components/toast';

function* updateUserInfosSaga(action) {
  const { table, data } = action.payload;
  try {
    const response = yield call(endpoints.updateUserInfos, table, data);
    if (response.error) throw new Error(response.error);
    const payload = { response, table };
    yield put({ type: ACTION_TYPES.UPDATE_USER_INFOS.SUCCESS, payload: payload });
    showToast('success', 'İşlem başarılı bir şekilde gerçekleşti!');
  } catch (error) {
    yield put({ type: ACTION_TYPES.UPDATE_USER_INFOS.ERROR, payload: error.message });
    showToast('error', error.message || 'İşlem yapılırken bir hata oluştu!');
  }
}

function* fetchUserInfosSaga(action) {
  try {
    const response = yield call(endpoints.getUser, action.payload);
    if (response.error) throw new Error(response.error);
    yield put({ type: ACTION_TYPES.FETCH_USER_INFOS.SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: ACTION_TYPES.FETCH_USER_INFOS.ERROR, payload: error.message });
  }
}

function* signInSaga(action) {
  try {
    const loginResponse = yield call(endpoints.login, action.payload);
    if (loginResponse && !loginResponse.error) {
      const result = yield call(signIn, "credentials", {
        name: action.payload.name,
        password: action.payload.password,
        redirect: false,
        callbackUrl: "/",
        userData: JSON.stringify(loginResponse)
      });

      if (result.error) {
        yield put({
          type: ACTION_TYPES.SIGN_IN.ERROR,
          payload: result.error || "Giriş sırasında bir hata oluştu.",
        });
      } else {
        yield put({
          type: ACTION_TYPES.SIGN_IN.SUCCESS,
          payload: loginResponse,
        });
        showToast('success', 'Giriş başarılı!.');
      }
    } else {
      yield put({
        type: ACTION_TYPES.SIGN_IN.ERROR,
        payload: loginResponse.error || "Giriş başarısız. Geçersiz kimlik bilgileri.",
      });
    }
  } catch (error) {
    yield put({
      type: ACTION_TYPES.SIGN_IN.ERROR,
      payload: error.message || "Beklenmeyen bir hata oluştu.",
    });
    console.log("error", error);
  }
}

export default function* userSaga() {
  yield takeEvery(ACTION_TYPES.UPDATE_USER_INFOS.REQUEST, updateUserInfosSaga);
  yield takeEvery(ACTION_TYPES.SIGN_IN.REQUEST, signInSaga);
  yield takeEvery(ACTION_TYPES.FETCH_USER_INFOS.REQUEST, fetchUserInfosSaga);
}
