import moment from "moment";

export const dateReviver = function (key: any, value: any) {
  if (typeof value === "string") {
    if (moment(value, moment.ISO_8601).isValid()) {
      return new Date(value);
    }
  }
  return value;
};

const uuid: { [key: string]: RegExp } = {
  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
};

export function isUUID(str: string) {
  const version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "all";
  const pattern = uuid[version];
  return pattern && pattern.test(str);
}
