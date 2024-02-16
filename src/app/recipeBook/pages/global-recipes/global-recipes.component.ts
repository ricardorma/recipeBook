import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-global-recipes',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './global-recipes.component.html',
  styleUrl: './global-recipes.component.css'
})
export default class GlobalRecipesComponent {

}
