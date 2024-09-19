import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core'; 
import { RecipeService } from '../../../services/recipe.service';
import { PeriodicElement, Recipe } from '../../../models/recipe.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';  

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
        // Aquí ya tenemos la propiedad "recipe" directamente en la respuesta
        this.$recipe.set(response.recipe);  // Guardamos la receta directamente
        this.ELEMENT_DATA = response.recipe.ingredients.map((ingredient, index) => ({
          position: index + 1,  // El índice se usa para la posición, comenzando desde 1
          ingredient: ingredient
        }));
        this.dataSource.data = this.ELEMENT_DATA;
        console.log(this.$recipe());  // Imprimir la receta actual
      },
      error: (err) => {
        console.error('Error al cargar la receta', err);
      }
    });
  }

  displayedColumns: string[] = ['position', 'name'];

  // Example recipe data
/* exampleRecipe: Recipe = {
  recipeName: "Spaghetti Carbonara",
  steps: [
    { stepNumber: 1, description: "Bring a large pot of salted water to a boil." },
    { stepNumber: 2, description: "Add spaghetti and cook until al dente." },
    { stepNumber: 3, description: "While spaghetti is cooking, heat olive oil in a large skillet over medium heat." },
    { stepNumber: 4, description: "Add pancetta and cook until golden and crisp." },
    { stepNumber: 5, description: "In a separate bowl, whisk together eggs, Parmesan cheese, and black pepper." },
    { stepNumber: 6, description: "Once spaghetti is cooked, reserve 1/2 cup of pasta water, then drain spaghetti." },
    { stepNumber: 7, description: "Immediately add hot spaghetti to skillet with pancetta, tossing to coat in the oil." },
    { stepNumber: 8, description: "Remove skillet from heat, then quickly add egg mixture, stirring constantly to prevent scrambling." },
    { stepNumber: 9, description: "If sauce is too thick, add reserved pasta water, a little at a time, until desired consistency is reached." },
    { stepNumber: 10, description: "Serve immediately, garnished with additional grated Parmesan cheese and chopped parsley." }
  ]
}; */
}
