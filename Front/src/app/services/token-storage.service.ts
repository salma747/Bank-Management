import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  logout(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
  public isLoggedIn():boolean{
    return this.getUser()!=null;
  }
  public isAdmin():boolean{
    if(this.isLoggedIn())
    {
      return this.getUser().roles.includes('ROLE_ADMIN');
    }
    return false;
  }




}
