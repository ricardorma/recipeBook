import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor:HttpInterceptorFn = (req, next) => {

    const modifiedReq = req.clone({
        withCredentials: true  // Permite que las cookies se envíen en todas las solicitudes
      });
    
      // Pasa la solicitud modificada al siguiente interceptor o al backend
    return next(modifiedReq);
  
}
