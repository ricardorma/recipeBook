import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor:HttpInterceptorFn = (req, next) => {
    // Obtener el token de localStorage
    const authToken = localStorage.getItem('authToken');

    // Solo añade la cabecera si el usuario tiene un token almacenado
    if (authToken) {
      // Clona la petición y añade la cabecera de Authorization con el token
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      // Enviar la petición con el token en las cabeceras
      return next(clonedRequest);
    }
      
      /** 
      * TODO: Añadir las notificaciones y mostrar un mensaje en pantalla de error de validación en autenticación
      return next.handle(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Redirige al login si el token no es válido o ha expirado
            this.router.navigate(['/login']);
          }
          return throwError(error);
        })
      );
      **/
    

    // Si no hay token, la petición se envía sin modificaciones
    return next(req);
  
}
