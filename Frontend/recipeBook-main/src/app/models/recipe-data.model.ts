export interface Meal {
    ingredient: string;
  }
  
  export interface Step {
    step: string;
  }
  
  export interface RecipeData {
    title: string;
    preparationTime: string;
    category: string;
    ingredients: string[];
    instructions: string[];
    foto: File | null;
  }
  