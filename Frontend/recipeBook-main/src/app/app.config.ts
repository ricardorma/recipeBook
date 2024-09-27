import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, HttpClientModule, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { authInterceptor } from './core/auth.interceptor';
import { provideToastr } from 'ngx-toastr';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return  new  TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export const provideTranslation = () => ({
  defaultLanguage: 'es',
  loader: {
    provide: TranslateLoader, 
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()), 
    provideAnimations(),
    provideToastr({
      timeOut: 5000,  // Duración del Toast (5 segundos)
      enableHtml: true,  // Permitir HTML en los mensajes
      closeButton: true,  // Botón de cierre
      progressBar: true,  // Barra de progreso
      progressAnimation: 'increasing',  // Barra de progreso animada
      tapToDismiss: true,  // Permitir tap para descartar
      disableTimeOut: false,  // No deshabilitar el tiempo de espera (cerrar después de timeOut)
      positionClass: 'toast-top-right'
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom([
      HttpClientModule, 
      TranslateModule.forRoot(provideTranslation())
    ]),
  ]
};
