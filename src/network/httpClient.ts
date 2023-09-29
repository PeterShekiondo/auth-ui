import { logout } from "@/util/utils";
import { NextRouter } from "next/router";
const baseURL =

  process.env.REACT_APP_BASE_URL || "http://localhost:3001/api/v1";

const headers = () => {
  let headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};


export const performFormDataHttp = async function <T>(
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
  params: {
    endPoint: string;
    withCredentials?: boolean;
    headers?: any;
    data?: any;
  },
  router?: NextRouter
) {
  try {
    const _headers = headers();

    const newHeaders = params.headers
      ? { ..._headers, Authorization: `Bearer ${params.headers}` }
      : _headers;
    let response = await fetch(`${baseURL}${params.endPoint}`, {
      headers: newHeaders,
      method: method,
      body: JSON.stringify(params.data),
    });

    if (response.status == 403) {
      if (router != null) logout(router);
      return {
        message: "un authorised",
        error: true,
      };
    }

    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
