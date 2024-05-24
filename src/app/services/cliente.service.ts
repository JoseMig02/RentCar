import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { environment } from '../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  signUp(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, cliente);
  }

  signIn(correo: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, { correo, contrasena });
  }

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  update(id: number, cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cliente);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
