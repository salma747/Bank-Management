import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../models/client';
import {environment} from '../../environments/environment';

const API = environment.api + '/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${API}/all`);
  }
  get(id: string): Observable<Client> {
    return this.httpClient.get<Client>(`${API}/${id}`);
  }

  add(client){
    return this.httpClient.post(`${API}/add`,client);
  }

  update(id,client) {
    return this.httpClient.put(`${API}/${id}`, client);
  }

  delete(client) {
    return  this.httpClient.delete(`${API}/${client.id}`);
  }

}
