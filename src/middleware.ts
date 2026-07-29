import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/auth/login", "/auth/register", "/unauthorized"];
const roleRoutes = [
    { path: "/dashboard/admin", roles: ["ADMIN"] },
    { path: "/dashboard/technician", roles: ["TECHNICIAN", "ADMIN"] },
    { path: "/dashboard/customer", roles: ["CUSTOMER", "ADMIN"] },
];

function decodeJwtPayload(token: string) {
    try {
        const payload = token.split(".")[1];
        const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decoded = Buffer.from(normalized, "base64").toString("utf8");
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("accessToken")?.value;
    const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/auth/");

    if (isPublicRoute) {
        return NextResponse.next();
    }

    if (!token) {
        const loginUrl = new URL("/auth/login", request.url);
        loginUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(loginUrl);
    }

    const payload = decodeJwtPayload(token);
    const role = payload?.role ?? payload?.user?.role;

    const matchedRoute = roleRoutes.find((route) => pathname.startsWith(route.path));
    if (matchedRoute && role && !matchedRoute.roles.includes(role)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/dashboard") && !role) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
