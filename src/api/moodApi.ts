import { request } from ".";

const moodApiFetchAllMoodEntries = async (token: string) => {
  return request("/moodentry", { headers: { Authorization: `Bearer ${token}` } });
};

export { moodApiFetchAllMoodEntries };
