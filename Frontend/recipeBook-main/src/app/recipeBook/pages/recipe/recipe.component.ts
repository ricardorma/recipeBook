import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core'; 
import { RecipeService } from '../../../services/recipe.service';
import { PeriodicElement, Recipe } from '../../../models/recipe.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';  
import { environment } from '../../../../environments/environment';
import { ConfigService } from '../../../services/config/config.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [MatTableModule, TranslateModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export default class RecipeComponent implements OnInit{

  protected readonly recipeService: RecipeService = inject(RecipeService);
  protected readonly route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly configService: ConfigService = inject(ConfigService);

  
  ELEMENT_DATA: PeriodicElement[] = [];

  $recipe : WritableSignal<Recipe | null> = signal(null);
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  $loading: WritableSignal<boolean> = this.recipeService.$loading;
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
      this.loadRecipe(id);
  }

  loadRecipe(id: string): void {
    this.recipeService.getRecipeById(id).subscribe({
      next: (response) => {
        response.recipe.image = `${this.configService.apiAuth}images/` + response.recipe.image;
        // Aquí ya tenemos la propiedad "recipe" directamente en la respuesta
        this.$recipe.set(response.recipe);  // Guardamos la receta directamente
        this.ELEMENT_DATA = response.recipe.ingredients.map((ingredient, index) => ({
          position: index + 1,  // El índice se usa para la posición, comenzando desde 1
          ingredient: ingredient
        }));
        this.dataSource.data = this.ELEMENT_DATA;
      },
      error: (err) => {
        console.error('Error al cargar la receta', err);
      }
    });
  }

  displayedColumns: string[] = ['position', 'name'];

}
