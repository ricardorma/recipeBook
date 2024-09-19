import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  
  if(authService.isAuthenticated()) {
    return true;
  } else {
    toastr.error('No tienes acceso a esta página. Inicia sesión primero.', 'Acceso denegado');
    router.navigate(['/recipe-book/welcome'], { queryParams: { returnUrl: state.url } });
    return false;  
  }

};
