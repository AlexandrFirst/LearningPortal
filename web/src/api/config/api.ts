import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const $instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  // withCredentials: true,
});

const makeRequest = <TRes>(request: Promise<AxiosResponse<TRes>>) => {
  return new Promise<TRes>((resolve, reject) => {
    try {
      request
        .then((res: AxiosResponse<TRes>) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (
            // err.response?.status === "301" ||
            // err.response?.status === "302" ||
            // err.response?.status === "501" ||
            // err.response?.status === "415"
            err.response?.status in ["301", "302", "501", "415"]
          ) {
            //TODO: add refresh url logic
            // const refreshurl = getTokenRefreshUrl()
            // window.location.href = refreshurl
          } else {
            reject(err);
          }
        });
    } catch (error) {
      reject("exception");
    }
  });
};

export const Get = <TRes>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TRes> => {
  return makeRequest($instance.get(url, config));
};

export const Post = <TReq, TRes>(
  url: string,
  request?: TReq,
  config?: AxiosRequestConfig
): Promise<TRes> => {
  return makeRequest($instance.post(url, request, config));
};

export const Put = <TReq, TRes>(
  url: string,
  request?: TReq,
  config?: AxiosRequestConfig
): Promise<TRes> => {
  return makeRequest($instance.put(url, request, config));
};

export const Delete = <TReq, TRes>(
  url: string,
  request?: TReq,
  config?: AxiosRequestConfig
): Promise<TRes> => {
  return makeRequest($instance.delete(url, config));
};
