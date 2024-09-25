import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-recipe',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './layout-recipe.component.html',
  styleUrl: './layout-recipe.component.css'
})
export default class LayoutRecipeComponent {
  currentYear: number = new Date().getFullYear(); 
}
