import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core'; 
import { RecipeService } from '../../../services/recipe.service';
import { PeriodicElement, Recipe } from '../../../models/recipe.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';  
import { environment } from '../../../../environments/environment';

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
        if (typeof response.recipe.image !== 'string' && response.recipe.image?.data) {
          // Construir el data URI usando el tipo de contenido y los datos en base64
          response.recipe.image = `data:${response.recipe.image.contentType};base64,${response.recipe.image.data}`;
        }
        this.$recipe.set(response.recipe);  // Guardamos la receta directamente
        this.ELEMENT_DATA = response.recipe.ingredients.map((ingredient, index) => ({
          position: index + 1,
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
