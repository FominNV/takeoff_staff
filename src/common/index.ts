import { FormatPhoneType } from "./types";

export const formatPhone: FormatPhoneType = (number) => {
  if (number.length >= 11) {
    return `${number.slice(0, 1)}-${number.slice(1, 4)}-${number.slice(4, 7)}-${number.slice(7)}`;
  }
  return number;
};
