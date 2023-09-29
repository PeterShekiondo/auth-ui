import { Role, UserType } from "@/types";
import { NextRouter } from "next/router";

export const removeUserDetailsFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const getToken = () => localStorage.getItem("accessToken");

export const setToken = (token: string) =>
  localStorage.setItem("accessToken", token);

export const setUser = (user: UserType) =>
  localStorage.setItem("user", JSON.stringify(user));

export const logout = (router: NextRouter) => {
  router.replace("/auth");
  removeUserDetailsFromLocalStorage();
};

export const capitalize = (s?: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const clearUser = () => removeUserDetailsFromLocalStorage();

export const authenticated = (router: NextRouter) => {
  var user = localStorage.getItem("user");
  var token = localStorage.getItem("accessToken");
  if (user == null && token == null) {
    logout(router);
  }
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    const userObject: UserType = user && JSON.parse(user);
    return userObject;
  }
};

export const routing = (role: Role, router: NextRouter) => {
  switch (role?.name) {
    case "NEW":
      router.replace("/requisition");
      return;
    case "ADMIN":
      router.replace("/accounts");
      return;
    case "STAFF":
      router.replace("/requisition");
      return;
    case "HOD":
      router.replace("/fund_request");
      return;
    case "CEO":
      router.replace("/department");
      return;
    case "CFO":
      router.replace("/department");
      return;
    case "CAO":
      router.replace("/department");
      return;
    case "SAO":
      router.replace("/department");
      return;
  }
};

export const formatDate = (date: Date) => {
  const formatDtae = new Date(date);
  return `${formatDtae.getDate()}-${formatDtae.getMonth()}-${formatDtae.getFullYear()}`;
};

export const thousandSeparator = (item: number) => item.toLocaleString();
