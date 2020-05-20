import { Reducer, AnyAction } from "redux";

const initialState: IMoodState = {
  entries: [],
};

export interface IMoodState {
  entries: [];
}

const moodReducer: Reducer<IMoodState> = (state = initialState, action: AnyAction) => {
  switch (action) {
    default:
      return state;
  }
};

export { moodReducer };
