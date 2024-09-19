import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: 'recipe-book',
    title: 'My Recipe Book' ,
    loadComponent: () => import('./recipeBook/pages/layout-recipe/layout-recipe.component'),
    children: [
      {
        path: 'my-recipes',
        title: 'My Recipe Book' ,
        canActivate: [authGuard],
        loadComponent: () =>
          import('./recipeBook/pages/my-recipes/my-recipes.component'),
      },
      {
        path: 'new-recipe',
        title: 'My Recipe Book'  ,
        canActivate: [authGuard],
        loadComponent: () =>
          import('./recipeBook/pages/new-recipe/new-recipe.component'),
      },
      {
        path: 'recipe/:id',
        title: 'My Recipe Book',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./recipeBook/pages/recipe/recipe.component'),
      },
      {
        path: 'welcome',
        title: 'My Recipe Book' ,
        loadComponent: () =>
          import('./recipeBook/pages/welcome-recipes/welcome-recipes.component'),
      },
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/recipe-book',
    pathMatch: 'full',
  },
];
