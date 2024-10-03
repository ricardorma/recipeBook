import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { map, catchError, of, switchMap, take } from 'rxjs';
import { ModalService } from '../services/modal-behaviour.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const modalService = inject(ModalService);

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
              // Abrimos el modal de inicio de sesión en lugar de mostrar el toast
              modalService.openModal();
              router.navigate(['/welcome'], { queryParams: { returnUrl: state.url } });
              return false;
            }
          }),
          catchError(() => {
            // Abrimos el modal de inicio de sesión en lugar de mostrar el toast
            modalService.openModal();
            router.navigate(['/welcome'], { queryParams: { returnUrl: state.url } });
            return of(false);  // En caso de error, deniega el acceso
          })
        );
      }
    })
  );
  
};
