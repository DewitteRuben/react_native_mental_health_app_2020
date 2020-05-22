import { BASE_API_LOCAL } from "../../env.json";
import ApiError from "../errors/ApiError";
import _ from "lodash";

const request = async (endpoint: string, requestInit?: RequestInit, parseAs: "json" | "string" = "json") => {
  if (!endpoint.includes("/")) {
    throw new Error("The endpoint must be prepended with /");
  }

  const options = _.merge(
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
    requestInit
  );

  const resp = await fetch(`${BASE_API_LOCAL}${endpoint}`, options);
  const data = await (parseAs === "json" ? resp.json() : resp.text());
  if (resp.status !== 200) {
    throw new ApiError(data.error.message, resp.status);
  }
  return data;
};

export { request };
