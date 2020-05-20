import { BASE_API_LOCAL } from "../../env.json";

const request = async (endpoint: string, requestInit?: RequestInit, parseAs: "json" | "string" = "json") => {
  if (!endpoint.includes("/")) {
    throw new Error("The endpoint must be prepended with /");
  }
  return fetch(`${BASE_API_LOCAL}${endpoint}`, requestInit).then((res) => (parseAs === "json" ? res.json() : res.text()));
};

export { request };
