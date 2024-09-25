import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { map, catchError, of, switchMap, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  return authService.isLoggedIn().pipe(
    take(1),  // Tomamos el valor actual de loggedIn y nos desuscribimos
    switchMap(isLoggedIn => {
      if (isLoggedIn) {
        return of(true);  // Si está autenticado localmente, permitimos el acceso
      } else {
        // Si no está autenticado, realizamos la petición al backend
        return authService.checkSession().pipe(
          map(isAuthenticated => {
            if (isAuthenticated) {
              authService.setLoggedIn(true);  // Actualizamos el estado local
              return true;
            } else {
              toastr.error('No tienes acceso a esta página. Inicia sesión primero.', 'Acceso denegado');
              router.navigate(['/recipe-book/welcome'], { queryParams: { returnUrl: state.url } });
              return false;
            }
          }),
          catchError(() => {
            toastr.error('No tienes acceso a esta página. Inicia sesión primero.', 'Acceso denegado');
            router.navigate(['/recipe-book/welcome'], { queryParams: { returnUrl: state.url } });
            return of(false);  // En caso de error, deniega el acceso
          })
        );
      }
    })
  );
};
