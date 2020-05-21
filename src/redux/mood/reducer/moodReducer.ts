import { Reducer, AnyAction } from "redux";
import { MoodAction, MOOD_ACTION_TYPES, IFetchAddNewMoodEntry } from "../actions/moodActions";
import { IMoodEntry } from "../../../api/moodApi";

const initialState: IMoodState = {
  entries: [],
};

export interface IMoodState {
  entries: IMoodEntry[];
}

const moodReducer: Reducer<IMoodState> = (state = initialState, action: MoodAction) => {
  switch (action.type) {
    case MOOD_ACTION_TYPES.FETCH_ADD_NEW_MOOD_ENTRIES:
      const { entries } = state;
      const { entry } = <IFetchAddNewMoodEntry>action;
      return { ...state, entries: [...entries, entry] };
    default:
      return state;
  }
};

export { moodReducer };
