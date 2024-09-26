import { Component, computed, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TranslateModule, TranslateService} from '@ngx-translate/core'; 
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';

import { ThemePalette } from '@angular/material/core';
import { RecipeService } from '../../../services/recipe.service';
import { Pagination, Recipe } from '../../../models/recipe.model';
import { AutoDestroyService } from '../../../services/auto-destroy.service';
import { BehaviorSubject, switchMap, take, takeUntil } from 'rxjs';
import { RecipeCategory } from '../../../models/recipe-category.enum';
import { RecipeFilters } from '../../../models/recipe-filters.model';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, CardComponent, MatProgressSpinnerModule,TranslateModule, CommonModule, MatDividerModule],
  providers: [AutoDestroyService],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.css'
})
export default class MyRecipesComponent implements OnInit{
 
  protected readonly recipeService: RecipeService = inject(RecipeService);
  protected readonly destroy$: AutoDestroyService = inject(AutoDestroyService);
  private filters$ = new BehaviorSubject<RecipeFilters>({
    category: '',
    pageSize: 8,
    page: 1
  });

  color: ThemePalette = 'warn';
  $loading: Signal<boolean> = this.recipeService.$loading;

  // Signal para obtener la página actual
  currentPage = computed(() => this.filters$.value.page ?? 1);
  

  $recipes: WritableSignal<Recipe[]> = signal([]);
  // Inicializamos la paginación con un objeto con valores por defecto
  pagination: WritableSignal<Pagination | null> = signal({
    currentPage: 1,
    pageSize: 8,
    totalRecipes: 0,
    totalPages: 0
  });

  categories: RecipeCategory[] = [];

  constructor() {}
  
  ngOnInit(): void {
    this.categories = Object.values(RecipeCategory);
    /*this.filters$ = new BehaviorSubject<RecipeFilters>({
      ...this.defaultRecipeFilters,
    });*/

    this.loadRecipes()
  }

  private loadRecipes(): void {
    const imageBaseUrl = `${environment.apiAuth}images/`;
    this.filters$.asObservable().pipe(
      takeUntil(this.destroy$),
      switchMap(filtros => this.recipeService.searchRecipes(filtros))
    )
    .subscribe(data => {
      data.recipes.forEach(recipe => {
        recipe.image = imageBaseUrl + recipe.image;
      });
      this.$recipes.set(data.recipes);
      this.pagination.set(data.pagination);  // Guardar la información de la paginación
    });
  }

  onRecipeDeleted(): void {
    this.loadRecipes(); // Vuelve a cargar las recetas después de borrar
  }

  onSelected(value: string): void {
    // Actualizar el filtro de categoría y reiniciar la paginación a la página 1
    (value)
    const currentFilters = this.filters$.value;
    this.filters$.next({
      ...currentFilters,
      category: value,
      page: 1
    });
  }

  onPageChange(newPage: number): void {
    // Actualizar el filtro de paginación
    const currentFilters = this.filters$.value;
    this.filters$.next({
      ...currentFilters,
      page: newPage
    });
  }

}
