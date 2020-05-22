import { Reducer, AnyAction } from "redux";
import {
  MoodAction,
  MOOD_ACTION_TYPES,
  IFetchAddNewMoodEntry,
  IAddToSyncQueue,
  ISetMoodEntries,
} from "../actions/moodActions";
import { IMoodEntry } from "../../../api/moodApi";

const initialState: IMoodState = {
  queue: [],
  entries: [],
};

export interface IMoodState {
  queue: string[];
  entries: IMoodEntry[];
}

const moodReducer: Reducer<IMoodState> = (state = initialState, action: MoodAction) => {
  switch (action.type) {
    case MOOD_ACTION_TYPES.FETCH_ADD_NEW_MOOD_ENTRIES: {
      const { entries } = state;
      const { entry } = <IFetchAddNewMoodEntry>action;
      return { ...state, entries: [...entries, entry] };
    }
    case MOOD_ACTION_TYPES.ADD_TO_SYNC_QUEUE: {
      const { queue } = state;
      const { entryId } = <IAddToSyncQueue>action;
      return { ...state, queue: [...queue, entryId] };
    }
    case MOOD_ACTION_TYPES.CLEAR_SYNC_QUEUE: {
      return { ...state, queue: [] };
    }
    case MOOD_ACTION_TYPES.SET_MOOD_ENTRIES: {
      const { entries } = <ISetMoodEntries>action;
      return { ...state, entries: [...entries] };
    }
    default:
      return state;
  }
};

export { moodReducer };
