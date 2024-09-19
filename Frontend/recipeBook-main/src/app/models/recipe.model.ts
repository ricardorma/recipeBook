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
    image: string;
    userId: string;
    views: number;
    createdAt: string;
  }
  