import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const getCookie = (name) => {
  return cookie.get(name);
};