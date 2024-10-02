export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalRecipes: number;
  totalPages: number;
}

export interface SearchRecipeResponse {
  recipes: Recipe[];
  pagination: Pagination;
}

export interface PeriodicElement {
  ingredient: string;
  position: number;
}

export interface Recipe {
    _id: string;
    title: string;
    category: string;
    ingredients: string[];
    instructions: string[];
    preparationTime: number;
    image: ImageData | string; 
    userId: string;
    views: number;
    createdAt: string;
  }
  
  // Define una interfaz para los datos de la imagen
export interface ImageData {
  data: Uint8Array | number[];  // Los datos binarios pueden estar en forma de Uint8Array o matriz de números
  contentType: string;          // El tipo MIME de la imagen (ejemplo: 'image/jpeg')
}