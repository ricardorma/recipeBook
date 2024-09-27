import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { finalize, Observable } from 'rxjs';
import { Recipe, SearchRecipeResponse } from '../models/recipe.model';
import { RecipeFilters } from '../models/recipe-filters.model';
import { RecipeData } from '../models/recipe-data.model';
import { ConfigService } from './config/config.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public $loading: WritableSignal<boolean> = signal(false);
  protected readonly configService: ConfigService = inject(ConfigService);

  constructor(private httpClient: HttpClient) {}

  searchRecipes(filters: RecipeFilters): Observable<SearchRecipeResponse> {
    this.$loading.set(true);
    let params: HttpParams = new HttpParams({
      fromObject: { ...filters },
    });
    return this.httpClient.get<SearchRecipeResponse>(`${this.configService.apiUrl}recipes`, { params })
                          .pipe(finalize(() => this.$loading.set(false)));
  }

  getRecipeById(id: string): Observable<{recipe: Recipe}> {
    this.$loading.set(true);
    return this.httpClient.get<{recipe: Recipe}>(`${this.configService.apiUrl}recipes/${id}`).pipe(finalize(() => this.$loading.set(false)));
  }

  createRecipe(recipe: FormData): Observable<RecipeData> {
    return this.httpClient.post<RecipeData>(`${this.configService.apiUrl}recipe`, recipe);
  }

  deleteRecipe(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.configService.apiUrl}recipes/${id}`);
  }
}
