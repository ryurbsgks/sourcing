import axios from "axios";
import { Cookies } from "react-cookie";
import { setIsLogin } from "../redux/action";

const cookie = new Cookies();

export const getCookie = (name) => {
  return cookie.get(name);
};

export const removeCookie = (name) => {
  return cookie.remove(name, { path: "/" });
};

export const setCookie = (name, value) => {
  return cookie.set(name, value);
};

export const isAuthenticated = (dispatch, cb) => {

  axios.get(`${process.env.REACT_APP_URL}/user/auth`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getCookie("sourcingAccess")}`
    }
  }).then( (res) => {
    if (res.data.message !== "로그인 상태입니다") {
      return dispatch(setIsLogin(false));
    }

    if (res.data.message === "로그인 상태입니다") {
      if (typeof cb === "function") {
        cb(res);
      }
    }
  })

};