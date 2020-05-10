import moment from "moment";

export const dateReviver = function (key: any, value: any) {
  if (typeof value === "string") {
    if (moment(value, moment.ISO_8601).isValid()) {
      return new Date(value);
    }
  }
  return value;
};
