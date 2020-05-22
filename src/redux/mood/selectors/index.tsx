import { IRootStoreState } from "../../store";
import { createSelector } from "reselect";

export const selectEntryQueue = (state: IRootStoreState) => state.mood.queue;

export const selectEntries = (state: IRootStoreState) => state.mood.entries;

export const entryIdsSelector = createSelector(selectEntries, (entries) => entries.map((entry) => entry.entryId));

export const idsToEntries = (ids: string[]) =>
  createSelector(selectEntries, (entries) => entries.filter((entry) => ids.includes(entry.entryId)));
