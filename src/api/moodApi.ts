import { request } from ".";
import { IExperienceItem } from "../components/ExperienceSelector";

export interface IMoodEntry {
  userId?: string;
  thoughts?: string;
  entryId: string;
  emotions: string[];
  experiences: IExperienceItem[];
  sleep: number;
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

const moodApiFetchCreateMoodEntry = async (token: string, moodEntry: IMoodEntry) => {
  return request("/moodentry", { method: "POST", body: JSON.stringify(moodEntry), ...authHeader(token) });
};

export { moodApiFetchAllMoodEntries, moodApiFetchCreateMoodEntry };
