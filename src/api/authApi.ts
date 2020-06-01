import { request } from ".";

const authApiFetchAuth = async (userId: string) => {
  const body = JSON.stringify({ userId });
  return request("/auth/user", { method: "POST", body });
};

export { authApiFetchAuth };
