import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Update the interceptor to not look for token in localStorage
apiClient.interceptors.request.use((config) => {
  console.log("API Request Debug:", {
    url: config.url,
    method: config.method,
    withCredentials: config.withCredentials,
  });
  return config;
});

export default apiClient;
