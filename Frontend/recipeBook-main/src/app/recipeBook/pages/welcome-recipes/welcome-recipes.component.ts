import { Component, HostListener  } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import {MatDividerModule} from '@angular/material/divider';
import {TranslateModule} from '@ngx-translate/core'; 

@Component({
  selector: 'app-welcome-recipes',
  standalone: true,
  imports: [MatDividerModule, TranslateModule],
  templateUrl: './welcome-recipes.component.html',
  styleUrl: './welcome-recipes.component.css'
})
export default class WelcomeRecipesComponent{
  
  section3Visible = true;

  constructor(private breakpointObserver: BreakpointObserver) {}

  @HostListener('window:scroll', [])
  onScroll(): void {

    // Disable scroll logic for small and medium devices
    if (this.breakpointObserver.isMatched('(max-width: 599px)') || this.breakpointObserver.isMatched('(max-width: 1025px)')) {
      this.section3Visible = true;
      ('Es dispositivo pequeño')
      return;
    }

    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // Check if user scrolled to a certain position to trigger loading of sections
    this.section3Visible = true;
    if (scrollPosition > 20) {
      
    }
  }
}