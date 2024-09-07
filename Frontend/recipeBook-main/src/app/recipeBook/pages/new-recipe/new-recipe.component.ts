import { Component, inject, OnInit} from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {TranslateModule} from '@ngx-translate/core'; 
import { RecipeCategory } from '../../../models/recipe-category.enum';
import { FormErrorService } from '../../../services/error-management.service';
import { Meal, RecipeData, Step } from '../../../models/recipe-data.model';
import { RequiredFileTypeDirective } from '../../../core/directives/required-file-type.directive' 
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-new-recipe',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatTableModule, MatDividerModule, TranslateModule, RequiredFileTypeDirective],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export default class NewRecipeComponent implements OnInit{

  protected readonly recipeService: RecipeService = inject(RecipeService);
  protected readonly formErrorService: FormErrorService = inject(FormErrorService);

  recetaForm!: FormGroup; // Usa la notación ! para indicar que se inicializará en ngOnInit
  ingMeal: Meal[] = [];
  steps:Step[] = [];
  valid:boolean = false;
  categories: RecipeCategory[] = [];
  formErrors: { [key: string]: string[] } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.categories = Object.values(RecipeCategory);
    // Inicializa el formulario en ngOnInit
    this.initializeForm();

  }

  private initializeForm():void {
    this.recetaForm = this.fb.group({
      titulo: ['', Validators.required],
      preparacion: ['', [Validators.required, Validators.min(1)]],
      categoria: ['', Validators.required],
      ingrediente: [''],
      paso: [''],
      foto: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.validateForm()) {
      const recipeData: FormData = this.collectFormData();
      this.recipeService.createRecipe(recipeData).subscribe({
        next: (data) => {
          console.log('Receta guardada correctamente', data);
        },
        error: (err) => {
          this.handleError(err);
        }
      }
      )
    } else {
      console.log('Formulario inválido');
    }
  }
  handleError(err: any) {
    if (err.status === 400) {
      console.error('Solicitud incorrecta, revisar los datos:', err.message);
    } else if (err.status === 500) {
      console.error('Error del servidor, inténtelo más tarde:', err.message);
    } else {
      console.error('Error inesperado:', err.message);
    }
  }

  validateForm(): boolean {
    this.formErrors = {};
    this.recetaForm.markAllAsTouched();

    let isValid = true;
    Object.keys(this.recetaForm.controls).forEach(key => {
      const control = this.recetaForm.get(key);
      if (control?.invalid) {
        isValid = false;
        this.formErrors[key] = this.formErrorService.getControlErrors(control);
      }
    });

    return isValid;
  }

  collectFormData(): FormData {
    const formValues = this.recetaForm.value;
    const formData = new FormData();
  
    formData.append('titulo', this.recetaForm.get('titulo')!.value);
    formData.append('preparacion', formValues.preparacion);
    formData.append('categoria', formValues.categoria);
    formData.append('foto', formValues.foto); 
  
    // Añadir ingredientes como un array
    this.ingMeal.forEach((meal, index) => {
      formData.append(`ingredientes[${index}]`, meal.ingredient);
    });
  
    // Añadir pasos como un array
    this.steps.forEach((step, index) => {
      formData.append(`pasos[${index}]`, step.step);
    });

    return formData;
  }



  // Método para añadir un nuevo ingrediente
  addItem(): void {
    const ingredient = this.recetaForm.get('ingrediente')!.value || '';
    if (ingredient) {
      this.ingMeal.push({ ingredient });
      this.recetaForm.get('ingrediente')!.reset();
    }
  }

  // Método para añadir un nuevo paso
  addPaso(): void {
    const step = this.recetaForm.get('paso')!.value || '';
    if (step) {
      this.steps.push({ step: step });
      this.recetaForm.get('paso')!.reset();
    }
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

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.recetaForm.patchValue({
        foto: file
      });
    }
  }

  // Método para verificar si hay errores en un control
  isControlInvalid(controlName: string): boolean {
    const control = this.recetaForm.get(controlName);
    return (control?.invalid && (control?.dirty || control?.touched)) ?? false;
  }
  

}
