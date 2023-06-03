export interface Dishes {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    disponibility: boolean;
    created_at?: Date;        
}
