import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  userProfile: any;

  constructor(private http: HttpClient, private router: Router) {}

  loginWithGoogle() {
    window.location.href = `${environment.apiAuth}auth/google`;
  }

  loginWithGitHub() {
    window.location.href = `${environment.apiAuth}auth/github`;
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean, userProfile: any) {
    this.loggedIn.next(value);
    this.userProfile = userProfile;
  }

  logout() {
    this.loggedIn.next(false);
    this.userProfile = null;
    this.router.navigate(['/recipe-book/welcome']);
  }
}
