import { Action, ActionCreator } from "redux";

const AUTH_ACTION_TYPES = {
  ATTEMPT_AUTH: "ATTEMPT_AUTH",
  SET_USER_ID: "SET_USER_ID",
};

interface ISetUserId extends Action {
  userId: string;
}

interface IAttemptAuth extends Action {
  userId?: string;
}

const AttemptAuthAction: ActionCreator<IAttemptAuth> = (userId?: string) => ({
  type: AUTH_ACTION_TYPES.ATTEMPT_AUTH,
  userId,
});

const SetUserIdAction: ActionCreator<ISetUserId> = (userId: string) => ({
  type: AUTH_ACTION_TYPES.SET_USER_ID,
  userId,
});

type AuthAction = ISetUserId | IAttemptAuth;

export { SetUserIdAction, AUTH_ACTION_TYPES, ISetUserId, AuthAction, IAttemptAuth, AttemptAuthAction };
