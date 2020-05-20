import { Action, ActionCreator } from "redux";

const AUTH_ACTION_TYPES = {
  SET_USER_ID: "SET_USER_ID",
};

interface ISetUserId extends Action {
  userId?: string;
}

const SetUserIdAction: ActionCreator<ISetUserId> = (userId?: string) => ({
  type: AUTH_ACTION_TYPES.SET_USER_ID,
  userId,
});

type AuthAction = ISetUserId;

export { SetUserIdAction, AUTH_ACTION_TYPES, ISetUserId, AuthAction };
