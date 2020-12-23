import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Compte} from '../models/compte';
import {environment} from '../../environments/environment';
import {Client} from '../models/client';


const API = environment.api + '/comptes';

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private httpClient:HttpClient ) { }


  getAll(): Observable<Compte[]> {
    return this.httpClient.get<Compte[]>(`${API}/all`);
  }

  get(rib: string): Observable<Compte> {
    return this.httpClient.get<Compte>(`${API}/${rib}`);
  }

  add(compte){
    return this.httpClient.post(`${API}/add`,compte);
  }
  update(rib,compte) {
    return this.httpClient.put(`${API}/${rib}`, compte);
  }

  delete(compte) {
    return  this.httpClient.delete(`${API}/${compte.rib}`);
  }
}
