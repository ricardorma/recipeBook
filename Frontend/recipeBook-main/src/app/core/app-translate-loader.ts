import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Función para crear el loader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
