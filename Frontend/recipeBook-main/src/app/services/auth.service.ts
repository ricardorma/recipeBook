import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  protected readonly userService: UserService = inject(UserService);
  // private userProfile = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  loginWithGoogle() {
    window.location.href = `${environment.apiAuth}auth/google`;
  }

  loginWithGitHub() {
    window.location.href = `${environment.apiAuth}auth/github`;
  }

  /*getUserProfile(): Observable<string | null> {
    return this.userProfile.asObservable();
  }*/

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');  
    return !!token;  
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  // Nueva función para verificar si la sesión del usuario es válida
  checkSession(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUsers}check-session`);
  }

  logout() {
    // Llama al backend para cerrar la sesión
    this.http.post(`${environment.apiAuth}logout`, {}).subscribe(() => {
      this.loggedIn.next(false);  // Actualiza el estado local de la autenticación
      this.router.navigate(['/welcome']);  // Redirige a la página de bienvenida
    }, (error) => {
      console.error('Error al cerrar sesión', error);  // Manejo de errores si la solicitud falla
    });
  }
  
}
