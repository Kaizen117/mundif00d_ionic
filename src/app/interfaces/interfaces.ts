export interface User {
    id: number;
    name: string;
    surname1: string;
    surname2: string;
    telephone: string;
    address: string;
    email: string;
    email_verified?: string;
    username: string;
    password: Date;
    type: string;
    activated?: boolean;    
}

export interface Dish {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    disponibility: boolean;
    created_at?: Date;
    liked?: boolean;     
}
