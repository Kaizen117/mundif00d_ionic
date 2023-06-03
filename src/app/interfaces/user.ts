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
    type?: string;
    activated?: boolean;
    liked?: boolean;
}
