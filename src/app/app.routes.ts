import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'recipe-book',
    title: 'My Recipe Book' ,
    loadComponent: () => import('./recipeBook/pages/layout-recipe/layout-recipe.component'),
    children: [
      {
        path: 'global-recipes',
        title: 'My Recipe Book' ,
        loadComponent: () =>
          import('./recipeBook/pages/global-recipes/global-recipes.component'),
      },

      {
        path: 'my-recipes',
        title: 'My Recipe Book' ,
        loadComponent: () =>
          import('./recipeBook/pages/my-recipes/my-recipes.component'),
      },
      {
        path: 'new-recipe',
        title: 'My Recipe Book'  ,
        loadComponent: () =>
          import('./recipeBook/pages/new-recipe/new-recipe.component'),
      },
      {
        path: 'recipe/:id',
        title: 'My Recipe Book',
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
