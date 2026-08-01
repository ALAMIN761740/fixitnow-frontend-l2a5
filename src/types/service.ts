export interface Category {
    id: string;
    name: string;
    description?: string;
}

export interface ServiceItem {
    id: string;
    name: string;
    description?: string;
    category?: Category | string;
    price?: number;
    image?: string;
}

export interface Technician {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    bio?: string;
    rating?: number;
    experience?: number;
    services?: ServiceItem[];
    category?: Category | string;
    image?: string;
}
