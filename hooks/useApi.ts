import { siteConfig } from "@/config/site";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

export default function useApi(config: AxiosRequestConfig) {
  const [loading, setLoading] = useState(false);
  const [respData, setRespData] = useState<AxiosResponse>();

  async function CallApi(): Promise<AxiosResponse> {
    var resp: AxiosResponse;
    try {
      setLoading(true);
      config.baseURL = siteConfig.apiURL;
      const axiosResp = await axios(config);
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
