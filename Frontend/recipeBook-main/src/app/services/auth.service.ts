import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  protected readonly userService: UserService = inject(UserService);
  // private userProfile = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  loginWithGoogle() {
    window.location.href = `${environment.apiAuth}auth/google`;
  }

  loginWithGitHub() {
    window.location.href = `${environment.apiAuth}auth/github`;
  }

  /*getUserProfile(): Observable<string | null> {
    return this.userProfile.asObservable();
  }*/

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');  
    return !!token;  
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
    /*this.userService.getUser().subscribe(profile => {
      console.log(profile);
      this.userProfile.next(profile.avatar); 
    })*/
  }

  logout() {
    this.loggedIn.next(false);
    //this.userProfile.next(null);
    localStorage.removeItem('authToken');
    this.router.navigate(['/recipe-book/welcome']);
  }
}
