export interface Meal {
    ingredient: string;
  }
  
  export interface Step {
    step: string;
  }
  
  export interface RecipeData {
    titulo: string;
    preparacion: string;
    categoria: string;
    ingredientes: string[];
    pasos: string[];
    foto: File | null;
  }
  