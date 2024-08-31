import { Component, OnInit} from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';



interface Food {
  value: string;
  viewValue: string;
}

export interface Meal {
  ingredient: string;
}

export interface Step {
  step: string;
}

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatTableModule, MatDividerModule],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export default class NewRecipeComponent implements OnInit{

  recetaForm!: FormGroup; // Usa la notación ! para indicar que se inicializará en ngOnInit
  foods: Food[] = [];
  ingMeal: Meal[] = [];
  steps:Step[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Inicializa el formulario en ngOnInit
    this.recetaForm = this.fb.group({
      titulo: ['', Validators.required],
      preparacion: ['', [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      ingredientes: ['', Validators.required],
      pasos: ['', Validators.required],
    });

    // Simula una carga asíncrona para el array de foods
    setTimeout(() => {
      this.foods = [
        { value: 'steak', viewValue: 'Steak' },
        { value: 'pizza', viewValue: 'Pizza' },
        { value: 'tacos', viewValue: 'Tacos' }
      ];
    }, 1000);
  }

  onSubmit() {
  }

  // Método para añadir un nuevo ingrediente
  addItem(): void {
    const ingredient = this.recetaForm.get('ingredientes')!.value || '';
    let meal:Meal = {
      ingredient: ingredient
    }
    this.ingMeal.push(meal);
    console.log(ingredient)
  }

  // Método para añadir un nuevo paso
  addPaso(): void {
    // Get values from the form
    const step = this.recetaForm.get('pasos')!.value || '';
 
    let stepStr:Step = {
      step: step
    }
    console.log(step)
    this.steps.push(stepStr);
  }

  // Método para eliminar un ingrediente
  removeIngrediente(index: number): void {
    this.ingMeal.splice(index, 1);
  }

  // Método para eliminar un paso
  removePaso(index: number): void {
    this.steps.splice(index, 1);
  }

  onSelected(value:string):void {
    console.log(value);
  }

}
