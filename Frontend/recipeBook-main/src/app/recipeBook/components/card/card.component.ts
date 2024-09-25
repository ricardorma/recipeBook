import { Component, EventEmitter, Input, input, Output } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router'; 
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() recipe!: Recipe; 
  @Output() recipeDeleted = new EventEmitter<void>(); // Emite un evento al eliminar la receta

  constructor(private recipeService: RecipeService) {}

  deleteRecipe(id: string) {
    this.recipeService.deleteRecipe(id).subscribe(() => {
      this.recipeDeleted.emit(); // Emitimos el evento cuando la receta es eliminada
    });
  }
}
