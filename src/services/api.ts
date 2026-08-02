import axios, {
    type AxiosError,
    type AxiosInstance,
} from "axios";


function unwrapApiResponse<T>(payload: unknown): T {

    if (
        payload &&
        typeof payload === "object" &&
        "data" in payload &&
        "success" in payload
    ) {
        return (payload as { data: T }).data;
    }

    return payload as T;
}


const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://fixitnow-backend-l2a5-3.onrender.com/api";


const apiClient: AxiosInstance = axios.create({
    baseURL: apiBaseUrl,
    timeout: 15000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});


apiClient.interceptors.request.use(
    (config) => {

        if (typeof window !== "undefined") {

            const token =
                localStorage.getItem("accessToken");

            if (token) {
                config.headers.Authorization =
                    `Bearer ${token}`;
            }
        }

        return config;
    }
);


apiClient.interceptors.response.use(
    (response) => {

        response.data = unwrapApiResponse(response.data);

        return response;
    },

    (error: AxiosError) => {

        if (
            error.response?.status === 401 &&
            typeof window !== "undefined"
        ) {
            localStorage.removeItem("accessToken");
        }

        return Promise.reject(error);
    }
);


export { apiClient };
export default apiClient;