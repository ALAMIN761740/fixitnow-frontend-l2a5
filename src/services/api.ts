import axios, { type AxiosError, type AxiosInstance } from "axios";

const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "https://fixitnow-backend-l2a4-1.onrender.com/api";

const apiClient: AxiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 15000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = window.localStorage.getItem("accessToken");

        if (token) {
            config.headers.set("Authorization", `Bearer ${token}`);
        }
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;

        if (status === 401 && typeof window !== "undefined") {
            window.localStorage.removeItem("accessToken");
        }

        return Promise.reject(error);
    },
);

export { apiClient };
export default apiClient;
