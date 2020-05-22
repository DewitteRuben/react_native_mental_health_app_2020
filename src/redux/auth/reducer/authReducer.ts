import { Reducer } from "redux";
import { ISetUserId, AUTH_ACTION_TYPES, AuthAction } from "../actions/authActions";

export type AuthStatus = "ESTABLISING_AUTH" | "REQUEST_AUTH" | "AUTHENTICATED";

const initialState: IAuthState = {
  userId: undefined,
  status: "ESTABLISING_AUTH",
};

export interface IAuthState {
  userId?: string;
  status: AuthStatus;
}

const authReducer: Reducer<IAuthState, ISetUserId> = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SET_USER_ID:
      const setUserAction: ISetUserId = action as ISetUserId;
      const { userId } = setUserAction;
      return { ...state, userId, status: "AUTHENTICATED" };
    case AUTH_ACTION_TYPES.REQUEST_AUTH:
      return { ...state, status: "REQUEST_AUTH" };
    default:
      return state;
  }
};

export { authReducer };
