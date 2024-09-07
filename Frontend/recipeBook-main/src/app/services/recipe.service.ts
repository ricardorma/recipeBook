import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { finalize, Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeFilters } from '../models/recipe-filters.model';
import { RecipeData } from '../models/recipe-data.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(private httpClient: HttpClient) {}

  searchRecipes(filters: RecipeFilters): Observable<Recipe[]> {
    this.$loading.set(true);
    let params: HttpParams = new HttpParams({
      fromObject: { ...filters },
    });
    return this.httpClient.get<Recipe[]>(`${environment.apiUrl}recipes`, { params })
                          .pipe(finalize(() => this.$loading.set(false)));
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${environment.apiUrl}recipes/${id}`);
  }

  createRecipe(recipe: FormData): Observable<RecipeData> {
    return this.httpClient.post<RecipeData>(`${environment.apiUrl}recipe`, recipe);
  }

  deleteRecipe(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/recipes/${id}`);
  }
}
