import { AsyncStorage } from "react-native";

const STORAGE_KEYS = {
  USERID: "STORAGE_USER_ID",
};

const setUserId = async (userId: string) => {
  return AsyncStorage.setItem(STORAGE_KEYS.USERID, userId);
};

const getUserId = async () => {
  return AsyncStorage.getItem(STORAGE_KEYS.USERID);
};

export { setUserId, getUserId };
