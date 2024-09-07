export interface Recipe {
    id: string;
    title: string;
    category: string;
    ingredients: string[];
    instructions: string[];
    preparationTime: number;
    image: string;
    userId: string;
    views: number;
    createdAt: string;
  }
  