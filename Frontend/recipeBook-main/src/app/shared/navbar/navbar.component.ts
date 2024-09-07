import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal-behaviour.service';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatMenuModule, MatMenuModule, RouterModule, CommonModule, LoginComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentLang: string;

  loggedIn: boolean = false;


  constructor(private translate: TranslateService, public authService: AuthService, private modalService: ModalService) {
    this.currentLang = this.translate.currentLang || 'es';
    this.authService.isLoggedIn().subscribe((status) => {
      this.loggedIn = status;
    }); // Por defecto, 'es'
  }

  switchLanguage(): void {
    this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
    this.translate.use(this.currentLang);
  }

  openLoginModal() {
    console.log('Aqui')
    this.modalService.openModal();  // Llama al método para abrir el modal
  }

}
