import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Add request interceptor
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Update headers to work with credentials
  if (config.headers) {
    config.headers["Content-Type"] = "application/json";
    config.headers.Accept = "application/json";
  }

  console.log("API Request Debug:", {
    url: config.url,
    method: config.method,
    withCredentials: config.withCredentials,
  });

  return config;
});

export default apiClient;
