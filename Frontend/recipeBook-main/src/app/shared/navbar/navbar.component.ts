import { Component, OnInit } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
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
export class NavbarComponent implements OnInit{
  currentLang: string;
  dropdownOpen: boolean = false; 
  loggedIn: boolean = false;
  // userProfile: any;

  constructor(private translate: TranslateService, public authService: AuthService, private modalService: ModalService, private router: Router) {
    this.currentLang = this.translate.currentLang || 'es';
     // Por defecto, 'es'
  }
  ngOnInit() {
    // Suscribirse al estado de loggedIn
    this.authService.isLoggedIn().subscribe((status) => {
      this.loggedIn = status;
    });

    // Suscribirse al perfil del usuario (avatar)
    /*this.authService.getUserProfile().subscribe((profile) => {
      console.log('navbar', profile)
      this.userProfile = profile;
    });*/
  }

  switchLanguage(): void {
    this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
    this.translate.use(this.currentLang);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;  // Alterna el estado del dropdown
  }

  openLoginModal() {
    console.log('Aqui')
    this.modalService.openModal();  // Llama al método para abrir el modal
  }

  logout() {
    this.authService.logout();  // Llama al servicio para cerrar sesión
    this.router.navigate(['/']);  // Redirige al inicio o donde sea necesario
  }

}
