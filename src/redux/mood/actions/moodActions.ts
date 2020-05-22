import { Action, ActionCreator } from "redux";
import { IMoodEntry } from "../../../api/moodApi";

const MOOD_ACTION_TYPES = {
  SET_MOOD_ENTRIES: "set_mood_entries",
  FETCH_ALL_MOOD_ENTRIES: "fetch_all_mood_entries",
  FETCH_ALL_MOOD_ENTRIES_SUCCESS: "fetch_all_mood_entries_success",
  FETCH_ALL_MOOD_ENTRIES_ERROR: "fetch_all_mood_entries_error",
  FETCH_ADD_NEW_MOOD_ENTRIES: "fetch_add_new_mood_entries",
  FETCH_ADD_NEW_MOOD_ENTRIES_SUCCESS: "fetch_add_new_mood_entries_success",
  FETCH_ADD_NEW_MOOD_ENTRIES_ERROR: "fetch_add_new_mood_entries_error",
  ADD_TO_SYNC_QUEUE: "add_to_push_live_queue",
  CLEAR_SYNC_QUEUE: "clear_push_live_queue",
  INIT_SYNC: "init_sync_task",
  CANCEL_SYNC: "cancel_sync_task",
};

interface IInitSync extends Action {}
interface ICancelSync extends Action {}

interface IFetchAddNewMoodEntry extends Action {
  entry: IMoodEntry;
}

interface IClearSyncQueue extends Action {}

interface IAddToSyncQueue extends Action {
  entryId: string;
}

interface IFetchAllMoodEntries extends Action {}
interface IFetchAllMoodEntriesSuccess extends Action {}
interface IFetchAllMoodEntriesError extends Action {
  error: any;
}

interface ISetMoodEntries extends Action {
  entries: IMoodEntry[];
}

const FetchAddNewMoodEntryAction: ActionCreator<IFetchAddNewMoodEntry> = (entry: IMoodEntry) => ({
  type: MOOD_ACTION_TYPES.FETCH_ADD_NEW_MOOD_ENTRIES,
  entry,
});

const AddToSyncQueueAction: ActionCreator<IAddToSyncQueue> = (entryId: string) => ({
  type: MOOD_ACTION_TYPES.ADD_TO_SYNC_QUEUE,
  entryId,
});

const ClearSyncQueueAction: ActionCreator<IClearSyncQueue> = () => ({
  type: MOOD_ACTION_TYPES.CLEAR_SYNC_QUEUE,
});

const SetMoodEntriesAction: ActionCreator<ISetMoodEntries> = (entries: IMoodEntry[]) => ({
  type: MOOD_ACTION_TYPES.SET_MOOD_ENTRIES,
  entries,
});

const FetchAllMoodEntriesAction: ActionCreator<IFetchAllMoodEntries> = () => ({
  type: MOOD_ACTION_TYPES.FETCH_ALL_MOOD_ENTRIES,
});

const FetchAllMoodEntrieSucesssAction: ActionCreator<IFetchAllMoodEntriesSuccess> = () => ({
  type: MOOD_ACTION_TYPES.FETCH_ALL_MOOD_ENTRIES_SUCCESS,
});

const FetchAllMoodEntriesErrorAction: ActionCreator<IFetchAllMoodEntriesError> = (error: any) => ({
  type: MOOD_ACTION_TYPES.FETCH_ALL_MOOD_ENTRIES_ERROR,
  error,
});

const InitSyncAction: ActionCreator<IInitSync> = () => ({
  type: MOOD_ACTION_TYPES.INIT_SYNC,
});

const CancelSyncAction: ActionCreator<ICancelSync> = () => ({
  type: MOOD_ACTION_TYPES.CANCEL_SYNC,
});

export type MoodAction = IFetchAddNewMoodEntry | IFetchAllMoodEntries;

export {
  MOOD_ACTION_TYPES,
  SetMoodEntriesAction,
  ISetMoodEntries,
  FetchAllMoodEntriesAction,
  FetchAllMoodEntriesErrorAction,
  FetchAllMoodEntrieSucesssAction,
  FetchAddNewMoodEntryAction,
  IFetchAddNewMoodEntry,
  IFetchAllMoodEntries,
  AddToSyncQueueAction,
  IAddToSyncQueue,
  ClearSyncQueueAction,
  InitSyncAction,
  IInitSync,
  CancelSyncAction,
  ICancelSync,
};
