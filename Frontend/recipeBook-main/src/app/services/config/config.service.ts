import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig() {
    return firstValueFrom(
      this.http.get('/assets/config/config.json')
    ).then((configData) => {
      this.config = configData;
    }).catch((error) => {
      console.error('Error loading config.json', error);
    });
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  get apiAuth(): string {
    return this.config.apiAuth;
  }

  get apiUsers(): string {
    return this.config.apiUsers;
  }
}
