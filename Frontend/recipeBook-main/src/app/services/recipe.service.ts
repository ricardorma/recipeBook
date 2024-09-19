import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { finalize, Observable } from 'rxjs';
import { Recipe, SearchRecipeResponse } from '../models/recipe.model';
import { RecipeFilters } from '../models/recipe-filters.model';
import { RecipeData } from '../models/recipe-data.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  searchRecipes(filters: RecipeFilters): Observable<SearchRecipeResponse> {
    this.$loading.set(true);
    let params: HttpParams = new HttpParams({
      fromObject: { ...filters },
    });
    return this.httpClient.get<SearchRecipeResponse>(`${environment.apiUrl}recipes`, { params })
                          .pipe(finalize(() => this.$loading.set(false)));
  }

  getRecipeById(id: string): Observable<{recipe: Recipe}> {
    this.$loading.set(true);
    return this.httpClient.get<{recipe: Recipe}>(`${environment.apiUrl}recipes/${id}`).pipe(finalize(() => this.$loading.set(false)));
  }

  createRecipe(recipe: FormData): Observable<RecipeData> {
    return this.httpClient.post<RecipeData>(`${environment.apiUrl}recipe`, recipe);
  }

  deleteRecipe(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/recipes/${id}`);
  }
}
