export interface Ingredient {
    id?: string; 
    name: string;
    quantity: number; 
    typeQuantity: 'G' | 'ML' | 'UNIT'; 
}