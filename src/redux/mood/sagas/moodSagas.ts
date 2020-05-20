import { takeEvery, put } from "redux-saga/effects";
import { MOOD_ACTION_TYPES, FetchAllMoodEntriesAction } from "../actions/moodActions";

function* watchFetchAllMoodEntries() {
  yield takeEvery(MOOD_ACTION_TYPES.FETCH_ALL_MOOD_ENTRIES, fetchAllMoodEntries);
}

function* fetchAllMoodEntries() {
  yield put(FetchAllMoodEntriesAction());
}
