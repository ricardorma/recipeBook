import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  protected readonly authService: AuthService = inject(AuthService);
  protected readonly router: Router = inject(Router);
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Verifica si hay un token en la URL (después de redirigir desde Google/GitHub)
    const token = this.getTokenFromUrl();
    if (token) {
      // Guarda el token en localStorage
      localStorage.setItem('authToken', token);
      
      // Llama a setLoggedIn con los datos del usuario
      this.authService.setLoggedIn(true);

      // Redirige a la página principal u otra después de recibir el token
      this.router.navigate(['/recipe-book/']);
    }
  }

  getTokenFromUrl(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');  // Extrae el token de la URL
  }
  
}
