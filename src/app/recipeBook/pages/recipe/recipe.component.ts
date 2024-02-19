import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
}

// Define an interface for a recipe step
interface RecipeStep {
  stepNumber: number;
  description: string;
}

// Define an interface for a recipe
interface Recipe {
  recipeName: string;
  steps: RecipeStep[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '300g de carne'},
  {position: 2, name: '2L de leche'},
  {position: 3, name: '5 dientes de ajo'}
];



@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export default class RecipeComponent {
  displayedColumns: string[] = ['position', 'name'];
  dataSource = ELEMENT_DATA;

  // Example recipe data
exampleRecipe: Recipe = {
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
};
}
