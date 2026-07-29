export const APP_NAME = "FixItNow";
export const APP_DESCRIPTION = "Modern booking and service management platform";
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "https://fixitnow-backend-l2a4-1.onrender.com/api";

export const BOOKING_STATUS = {
    REQUESTED: "REQUESTED",
    ACCEPTED: "ACCEPTED",
    DECLINED: "DECLINED",
    PAID: "PAID",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
} as const;
