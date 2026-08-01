import { redirect } from "next/navigation";

export default function DashboardCustomerPage() {
    redirect("/dashboard/customer/bookings");
}
