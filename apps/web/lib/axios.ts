import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

let accessToken: string | null = null;

export const setAxiosAccessToken = (token: string | null) => {
  accessToken = token;
};

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

let onRefreshFail: (() => void) | null = null;
export const setOnRefreshFail = (fn: () => void) => {
  onRefreshFail = fn;
};

let refreshPromise: Promise<string | null> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const isRefreshCall = originalRequest.url?.includes("/session/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshCall
    ) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = api
          .post("/api/v1/session/refresh")
          .then((res) => {
            setAxiosAccessToken(res.data.accessToken);
            return res.data.accessToken;
          })
          .catch(() => {
            setAxiosAccessToken(null);
            onRefreshFail?.();
            return null;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newToken = await refreshPromise;
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // retry the original call, transparently
      }
    }
    return Promise.reject(error);
  },
);
