import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/unauthorized",
];

const roleRoutes = [
    {
        path: "/dashboard/admin",
        roles: ["ADMIN"],
    },
    {
        path: "/dashboard/technician",
        roles: ["TECHNICIAN", "ADMIN"],
    },
    {
        path: "/dashboard/customer",
        roles: ["CUSTOMER", "ADMIN"],
    },
];

function decodeJwtPayload(token: string) {
    try {
        const base64Url = token.split(".")[1];

        if (!base64Url) return null;

        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(
                    (char) =>
                        "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2)
                )
                .join("")
        );

        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = request.cookies.get("accessToken")?.value;

    const isPublic =
        publicRoutes.includes(pathname) ||
        pathname.startsWith("/auth");

    if (isPublic) {
        return NextResponse.next();
    }

    if (!token) {
        const loginUrl = new URL("/auth/login", request.url);

        loginUrl.searchParams.set("redirectTo", pathname);

        return NextResponse.redirect(loginUrl);
    }

    const payload = decodeJwtPayload(token);

    if (!payload) {
        const response = NextResponse.redirect(
            new URL("/auth/login", request.url)
        );

        response.cookies.delete("accessToken");

        return response;
    }

    const role = payload.role ?? payload.user?.role;

    const matchedRoute = roleRoutes.find((route) =>
        pathname.startsWith(route.path)
    );

    if (
        matchedRoute &&
        role &&
        !matchedRoute.roles.includes(role)
    ) {
        return NextResponse.redirect(
            new URL("/unauthorized", request.url)
        );
    }

    if (pathname.startsWith("/dashboard") && !role) {
        return NextResponse.redirect(
            new URL("/auth/login", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};