import { takeLeading, call, put } from "redux-saga/effects";
import { SetUserIdAction, AUTH_ACTION_TYPES, ISetUserId } from "../actions/authActions";
import { setUserId, getUserId } from "../../../utils/storage";

function* watchOnAuthenticate() {
  yield takeLeading(AUTH_ACTION_TYPES.SET_USER_ID, authenticate);
}

function* authenticate(action: ISetUserId) {
  const { userId } = action;
  if (userId) {
    yield call(() => setUserId(userId));
  }

  const id = yield call(() => getUserId());
  if (id) {
    yield put(SetUserIdAction(id));
  }
}

export { authenticate, watchOnAuthenticate };
