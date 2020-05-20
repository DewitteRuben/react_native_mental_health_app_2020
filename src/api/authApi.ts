import { request } from ".";

const authApiFetchAuth = async (userId: string) => {
  const body = JSON.stringify({ userId });
  return request("/auth", { method: "POST", body });
};

export { authApiFetchAuth };
