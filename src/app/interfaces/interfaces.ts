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

export interface Reserve {
    id: number;
    user_id: number;
    table_id: number;
    diner_number: number;
    date: Date;
    hour: Date;
    observations: string;
    created_at?: Date;
    updated_at?: Date;     
}

export interface Allergen {
    id: number;
    dish_id: number;    
    name: string;
    created_at?: Date;
    updated_at?: Date;     
}