import { Component} from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';

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
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatDividerModule, CommonModule],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export default class NewRecipeComponent {

  searchInput: string = '';

  private category:string = '';
  public meals:Meal[] = [];
  public steps:Step[] = [];
  
  checkoutForm = this.formBuilder.group({
    recetaTitle: ['', [ Validators.required]],
    ingredient: ['', [ Validators.required]],
    step: ['', [ Validators.required]],
    tCocinado: [0, [ Validators.required, Validators.min(0)]],
    nIng: [0, [ Validators.required, Validators.min(0)]],
    descReceta: ['', [ Validators.required]],
  });

  isValidField( field: string): boolean | null | undefined {

    return this.checkoutForm.get(field)?.errors
      && this.checkoutForm.get(field)?.touched;
    
  }

  getFieldError( field: string ): string | null {

    if ( !this.checkoutForm.get(field) ) return null;

    const errors = this.checkoutForm.get(field)?.errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return '* Required';
          case 'min':
            return '* Min: 1';
      }
    }

    return null;
  }

  constructor(private formBuilder: FormBuilder) {
  }

  foods: Food[] = [
    {value: 'steak', viewValue: 'Steak'},
    {value: 'pizza', viewValue: 'Pizza'},
    {value: 'tacos', viewValue: 'Tacos'},
  ];


  onSelected(value:string):void {
    console.log(value);
    this.category = value;
  }

  addItem(): void {
   console.log('Si')
    // Get values from the form
    const ingredient = this.checkoutForm.get('ingredient')!.value || '';

    let meal:Meal = {
      ingredient: ingredient
    }
    console.log(meal)
    this.meals.push(meal);
  }

  addStep(): void {
     // Get values from the form
     const step = this.checkoutForm.get('step')!.value || '';
 
     let stepStr:Step = {
       step: step
     }
     console.log(step)
     this.steps.push(stepStr);
   }

  onSubmit():void {
    console.log('Datos enviados')
  }

  deleteIng( index:number ) {
    this.meals.splice(index, 1);
  }
  deleteStep( index:number ) {
    this.steps.splice(index, 1);
  }
}
