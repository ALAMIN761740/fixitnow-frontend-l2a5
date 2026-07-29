"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { toast } from "sonner";
import { getCurrentUser, login, register } from "@/services/auth";
import type {
    AuthResponse,
    AuthUser,
    LoginPayload,
    RegisterPayload,
    UserRole,
} from "@/types/auth";

interface AuthContextValue {
    user: AuthUser | null;
    loading: boolean;
    loginUser: (payload: LoginPayload) => Promise<void>;
    registerUser: (payload: RegisterPayload) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function setStoredToken(token: string) {
    if (typeof window !== "undefined") {
        window.localStorage.setItem("accessToken", token);
        document.cookie = `accessToken=${token}; path=/; max-age=604800; SameSite=Lax`;
    }
}

function getStoredToken() {
    if (typeof window === "undefined") {
        return null;
    }

    return window.localStorage.getItem("accessToken");
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const persistAuth = (auth: AuthResponse) => {
        const token = auth.token ?? auth.accessToken;
        if (!token) {
            throw new Error("No authentication token received");
        }

        setStoredToken(token);
        setUser(auth.user);
    };

    const logout = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("accessToken");
            document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        setUser(null);
        toast.success("Signed out");
    };

    useEffect(() => {
        async function bootstrap() {
            const token = getStoredToken();
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const authUser = await getCurrentUser();
                setUser(authUser.user);
            } catch {
                if (typeof window !== "undefined") {
                    window.localStorage.removeItem("accessToken");
                }
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        bootstrap();
    }, []);

    const loginUser = async (payload: LoginPayload) => {
        const auth = await login(payload);
        persistAuth(auth);
        toast.success("Signed in successfully");
    };

    const registerUser = async (payload: RegisterPayload) => {
        const auth = await register(payload);
        persistAuth(auth);
        toast.success("Account created successfully");
    };

    const hasRole = (role: UserRole) => user?.role === role;

    const value = useMemo(
        () => ({
            user,
            loading,
            loginUser,
            registerUser,
            logout,
            isAuthenticated: Boolean(user),
            hasRole,
        }),
        [user, loading],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}
