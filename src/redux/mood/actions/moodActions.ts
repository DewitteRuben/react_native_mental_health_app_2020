import { Action, ActionCreator } from "redux";

const MOOD_ACTION_TYPES = {
  SET_MOOD_ENTRIES: "set_mood_entries",
  FETCH_ALL_MOOD_ENTRIES: "fetch_all_mood_entries",
  FETCH_ALL_MOOD_ENTRIES_SUCCESS: "fetch_all_mood_entries_success",
  FETCH_ALL_MOOD_ENTRIES_ERROR: "fetch_all_mood_entries_error",
};

interface IFetchAllMoodEntries extends Action {}
interface IFetchAllMoodEntriesSuccess extends Action {}
interface IFetchAllMoodEntriesError extends Action {
  error: any;
}

interface ISetMoodEntries extends Action {
  entries: [];
}

const SetMoodEntriesAction: ActionCreator<ISetMoodEntries> = (entries: []) => ({
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

export {
  MOOD_ACTION_TYPES,
  SetMoodEntriesAction,
  FetchAllMoodEntriesAction,
  FetchAllMoodEntriesErrorAction,
  FetchAllMoodEntrieSucesssAction,
};
