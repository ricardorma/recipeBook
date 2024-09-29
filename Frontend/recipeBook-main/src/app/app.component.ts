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
    // Verificar si el usuario ya está autenticado en el backend
    this.authService.checkSession().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.authService.setLoggedIn(true);
        this.router.navigate(['/welcome/']);
      } else {
        this.authService.setLoggedIn(false);
      }
    });
  }
  
}
