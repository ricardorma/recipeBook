import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  {
    // Cambiar 'recipe-book' por ''
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
      {
        // Redirige al componente 'welcome' por defecto si no hay otra ruta
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
    ],
  },
  {
    // Cualquier ruta no encontrada redirigirá a la raíz (ya no 'recipe-book')
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
