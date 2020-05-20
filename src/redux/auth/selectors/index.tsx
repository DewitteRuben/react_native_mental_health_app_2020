import { IAuthState } from "../reducer/authReducer";

export const isAuthenticated = (state: IAuthState) => state.userId !== null;
