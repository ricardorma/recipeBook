import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { finalize, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ConfigService } from './config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public $loading: WritableSignal<boolean> = signal(false);
  protected readonly configService: ConfigService = inject(ConfigService);

  constructor(private httpClient: HttpClient) {}

  getUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.configService.apiUsers}user`);
  }

}
