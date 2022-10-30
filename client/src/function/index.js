import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const getCookie = (name) => {
  return cookie.get(name);
};

export const removeCookie = (name) => {
  return cookie.remove(name, { path: "/" });
};