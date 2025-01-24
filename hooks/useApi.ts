"use client";

import { siteConfig } from "@/config/site";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

export default function useApi<T>(config: AxiosRequestConfig) {
  const [loading, setLoading] = useState(false);
  const [respData, setRespData] = useState<AxiosResponse<T>>();

  async function CallApi(): Promise<AxiosResponse<T>> {
    var resp: AxiosResponse<T>;
    try {
      setLoading(true);
      config.baseURL = siteConfig.apiURL;
      config.headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const axiosResp = await axios<T>(config);
      setRespData(axiosResp);
      resp = axiosResp;
    } catch (e: any) {
      const failResp: AxiosResponse = {
        status: e.status,
        data: null,
        statusText: `Error - ${e}`,
        config: null,
        headers: {},
      };
      setRespData(failResp);
      resp = failResp;
    } finally {
      setLoading(false);
    }

    return resp;
  }

  function SetRequestBody(data: any) {
    config.data = data;
  }

  return { loading, respData, executeAsync: CallApi, SetRequestBody };
}
