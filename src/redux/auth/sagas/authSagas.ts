import { takeLeading, call, put, select } from "redux-saga/effects";
import { SetUserIdAction, AUTH_ACTION_TYPES, IAttemptAuth, RequestAuthAction } from "../actions/authActions";
import { setUserId, getUserId } from "../../../utils/storage";
import { authApiFetchAuth } from "../../../api/authApi";
import { selectUserId } from "../selectors";

function* watchOnAuthenticate() {
  yield takeLeading(AUTH_ACTION_TYPES.ATTEMPT_AUTH, authenticate);
}

function* auth(userId: string) {
  const { token } = yield call(authApiFetchAuth, userId);
  return token;
}

function* getToken() {
  const userId: string = yield select(selectUserId);
  if (!userId) return null;
  const token: string = yield call(auth, userId);
  return token;
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
    } else {
      yield put(RequestAuthAction());
    }
  } catch (error) {
    console.error(error);
  }
}

export { authenticate, watchOnAuthenticate, getToken };
