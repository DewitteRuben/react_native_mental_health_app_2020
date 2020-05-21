import { takeLeading, call, put } from "redux-saga/effects";
import { SetUserIdAction, AUTH_ACTION_TYPES, IAttemptAuth } from "../actions/authActions";
import { setUserId, getUserId } from "../../../utils/storage";
import { authApiFetchAuth } from "../../../api/authApi";

function* watchOnAuthenticate() {
  yield takeLeading(AUTH_ACTION_TYPES.ATTEMPT_AUTH, authenticate);
}

function* authenticate(action: IAttemptAuth) {
  const { userId } = action;
  try {
    if (userId) {
      yield call(authApiFetchAuth, userId);
      yield call(setUserId, userId);
    }

    const id = yield call(getUserId);
    if (id) {
      yield put(SetUserIdAction(id));
    }
  } catch (error) {
    console.error(error);
  }
}

export { authenticate, watchOnAuthenticate };
