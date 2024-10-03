import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
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

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  // Nueva función para verificar si la sesión del usuario es válida
  checkSession(): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiUsers}check-session`);
  }

  logout(): Observable<any> {
    // Llama al backend para cerrar la sesión y retorna el observable
    return this.http.post(`${environment.apiAuth}logout`, {})
      .pipe(
        tap(() => {
          this.loggedIn.next(false);  // Actualiza el estado local de autenticación
        }),
        catchError((error) => {
          console.error('Error al cerrar sesión', error);  // Manejo de errores si la solicitud falla
          return of(error);  // Reemitir el error para que se pueda manejar en el componente
        })
      );
  }
  
  
}
