import { request } from ".";
import { IExperienceItem } from "../components/ExperienceSelector";

export interface IMoodEntry {
  userId?: string;
  thoughts?: string;
  entryId: string;
  emotions: string[];
  experiences: IExperienceItem[];
  hoursOfSleep: number;
  mood: string;
  date: Date;
}

const authHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const moodApiFetchAllMoodEntries = async (token: string) => {
  return request("/moodentry", authHeader(token));
};

const moodApiFetchAllMoodEntryIDs = async (token: string) => {
  const entries = await request("/moodentry?props=entryId", authHeader(token));
  return entries.map((entry: { entryId: string }) => entry.entryId);
};

const moodApiFetchCreateMoodEntry = async (token: string, moodEntry: IMoodEntry) => {
  return request("/moodentry", { method: "POST", body: JSON.stringify(moodEntry), ...authHeader(token) });
};

const moodApiFetchMoodEntryByEntryId = async (token: string, entryId: string) => {
  return request(`/moodentry?entryId=${entryId}`, authHeader(token));
};

export {
  moodApiFetchAllMoodEntries,
  moodApiFetchCreateMoodEntry,
  moodApiFetchAllMoodEntryIDs,
  moodApiFetchMoodEntryByEntryId,
};
