import { Reducer } from "redux";
import { ISetUserId, AUTH_ACTION_TYPES, AuthAction } from "../actions/authActions";

const initialState: IAuthState = {
  userId: undefined,
};

export interface IAuthState {
  userId?: string;
}

const authReducer: Reducer<IAuthState, ISetUserId> = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SET_USER_ID:
      const setUserAction: ISetUserId = action as ISetUserId;
      const { userId } = setUserAction;
      return { ...state, userId };
    default:
      return state;
  }
};

export { authReducer };
