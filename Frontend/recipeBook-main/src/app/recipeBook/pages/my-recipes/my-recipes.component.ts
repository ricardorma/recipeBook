import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ThemePalette } from '@angular/material/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, CardComponent, MatProgressSpinnerModule],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.css'
})
export default class MyRecipesComponent implements OnInit{
  public color: ThemePalette = 'warn';
  loading:boolean = true;
  ngOnInit(): void {
    //! Importar servicio en el constructor y traerse las recetas guardadas
    //Si no se encuentra nada, el else debería ser una caja texto que diga, no se han encontrado resultados
    //Sii se encuentra, mostramos todas las cards
  }

  foods: Food[] = [
    {value: 'steak', viewValue: 'Steak'},
    {value: 'pizza', viewValue: 'Pizza'},
    {value: 'tacos', viewValue: 'Tacos'},
  ];

  comida: string[] = [];

  onSelected(value:string):void {
    console.log(value);
    this.loading = true;
    setInterval(() => {
      this.loading = false;
    }, 1500)
  }

}
