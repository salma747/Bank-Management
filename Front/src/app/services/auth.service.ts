import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {TokenStorageService} from './token-storage.service';
import {Router} from '@angular/router';

const AUTH_API = `${environment.api}/api/auth`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient,private tokenStorageService:TokenStorageService,private router:Router) { }

  login(credentials) {
    return this.http.post<any>(`${AUTH_API}/signin`, {
      username: credentials.username,
      password: credentials.password
    }, httpOptions).pipe(map((data)=>{
      this.tokenStorageService.saveUser(data);
      this.tokenStorageService.saveToken(data.accessToken);
      this.currentUser.next(data);
      return data;
    }));
  }

  register(user): Observable<any> {
    return this.http.post(`${AUTH_API}/signup`, {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }

  logout(){
    this.tokenStorageService.logout();
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }
}
