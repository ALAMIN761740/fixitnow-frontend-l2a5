import axios, {
    AxiosError,
    type AxiosInstance,
} from "axios";

interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
}

function unwrapApiResponse<T>(payload: unknown): T {
    if (
        payload &&
        typeof payload === "object" &&
        "success" in payload &&
        "data" in payload
    ) {
        return (payload as ApiResponse<T>).data;
    }

    return payload as T;
}

const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";

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
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        response.data = unwrapApiResponse(response.data);

        return response;
    },

    (error: AxiosError) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("accessToken");

                document.cookie =
                    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }

        let message = "Something went wrong.";

        const data = error.response?.data as
            | {
                message?: string;
                errorDetails?: unknown;
            }
            | undefined;

        if (data?.message) {
            message = data.message;
        }

        const customError = new Error(message);

        return Promise.reject(customError);
    }
);

export { apiClient };

export default apiClient;