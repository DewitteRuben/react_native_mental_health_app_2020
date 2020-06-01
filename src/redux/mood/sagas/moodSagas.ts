import { put, call, select, delay, takeEvery, takeLatest, all, cancel } from "redux-saga/effects";
import {
  AddToSyncQueueAction,
  IFetchAddNewMoodEntry,
  MOOD_ACTION_TYPES,
  ClearSyncQueueAction,
  SetMoodEntriesAction,
} from "../actions/moodActions";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { selectEntryQueue, entryIdsSelector, idsToEntries, selectEntries } from "../selectors";
import { getToken } from "../../auth/sagas/authSagas";
import {
  moodApiFetchAllMoodEntryIDs,
  IMoodEntry,
  moodApiFetchCreateMoodEntry,
  moodApiFetchMoodEntryByEntryId,
} from "../../../api/moodApi";
import _ from "lodash";
import { Task } from "redux-saga";

function* watchNewMoodEntries() {
  yield takeEvery(MOOD_ACTION_TYPES.FETCH_ADD_NEW_MOOD_ENTRIES, fetchAddNewMoodEntry);
}

function* fetchAddNewMoodEntry(action: IFetchAddNewMoodEntry) {
  const { entry } = action;
  yield put(AddToSyncQueueAction(entry.entryId));
}

function* syncTask() {
  const syncTask = yield takeLatest(MOOD_ACTION_TYPES.INIT_SYNC, sync);
  yield (<any>takeLatest)(MOOD_ACTION_TYPES.CANCEL_SYNC, cancelSyncTask, syncTask); // ts bug..
}

function* cancelSyncTask(syncTask: Task) {
  yield cancel(syncTask);
}

function* syncProcess() {
  const netInfoState: NetInfoState = yield call(NetInfo.fetch);
  const localQueue: string[] = yield select(selectEntryQueue);

  if (!netInfoState.isInternetReachable) {
    return;
  }

  const token = yield call(getToken);
  if (!token) {
    return;
  }

  const localEntryIDs: string[] = yield select(entryIdsSelector);
  const remoteEntryIDs = yield call(moodApiFetchAllMoodEntryIDs, token);
  const entryIdsNotLocalYet = _.difference(remoteEntryIDs, localEntryIDs);

  // Fetch missing entries from remote db
  if (entryIdsNotLocalYet.length) {
    const entriesToFetch = yield all(
      entryIdsNotLocalYet.map((entryId) => call(moodApiFetchMoodEntryByEntryId, token, entryId))
    );

    const localEntries = yield select(selectEntries);

    yield put(SetMoodEntriesAction([...localEntries, ...entriesToFetch[0]]));
  }

  if (!localQueue.length) {
    return;
  }

  const entryIdQueueForLive = _.difference(localQueue, remoteEntryIDs);

  // Entries to push to remote db
  const entryQueueForLive = yield select(idsToEntries(entryIdQueueForLive));

  // Push all entries in parallel
  const itemsPushedLive = yield all(
    entryQueueForLive.map((entry: IMoodEntry) => call(moodApiFetchCreateMoodEntry, token, entry))
  );

  // Clear queue after pushing live
  yield put(ClearSyncQueueAction());
}

function* sync() {
  while (true) {
    yield syncProcess();

    // Wait before next sync
    yield delay(5000);
  }
}

export { watchNewMoodEntries, syncTask };
