import { IRootStoreState } from "../../store";

export const selectUserId = (state: IRootStoreState) => state.auth.userId;
