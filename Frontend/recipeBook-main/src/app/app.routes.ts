import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  {
    // Ruta raíz vacía que redirige a /welcome por defecto
    path: '',
    pathMatch: 'full',
    redirectTo: 'welcome', // Cambiado para redirigir a la página de bienvenida
  },
  {
    // Ruta principal de la app (vacía en lugar de 'recipe-book')
    path: '',
    title: 'My Recipe Book',
    loadComponent: () => import('./recipeBook/pages/layout-recipe/layout-recipe.component'),
    children: [
      {
        path: 'my-recipes',
        title: 'My Recipes',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./recipeBook/pages/my-recipes/my-recipes.component'),
      },
      {
        path: 'new-recipe',
        title: 'New Recipe',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./recipeBook/pages/new-recipe/new-recipe.component'),
      },
      {
        path: 'recipe/:id',
        title: 'Recipe Detail',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./recipeBook/pages/recipe/recipe.component'),
      },
      {
        path: 'welcome',
        title: 'Welcome',
        loadComponent: () =>
          import('./recipeBook/pages/welcome-recipes/welcome-recipes.component'),
      },
    ],
  },
  {
    // Ruta para manejar cualquier URL no encontrada
    path: '**',
    redirectTo: 'welcome',
    pathMatch: 'full', // Asegurarnos de que cualquier ruta desconocida redirija a welcome
  },
];
