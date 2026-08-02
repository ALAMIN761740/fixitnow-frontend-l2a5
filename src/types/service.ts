export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface ServiceItem {
    id: string;
    name?: string;
    title?: string;
    description?: string;
    category?: Category | string;
    price?: number;
    image?: string;
}

export interface Technician {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    bio?: string;
    rating?: number;
    experience?: number;
    experienceYears?: number;
    skills?: string[];
    services?: ServiceItem[];
    category?: Category | string;
    image?: string;
    user?: {
        id: string;
        name?: string;
        email: string;
    };
    reviews?: unknown[];
}
