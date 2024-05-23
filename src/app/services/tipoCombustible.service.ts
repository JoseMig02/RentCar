import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/environment';
import { TipoCombustible } from '../models/TipoCombustible';

@Injectable({
  providedIn: 'root'
})
export class TipoCombustibleService {
  private apiUrl = `${environment.apiUrl}/tipoCombustible`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoCombustible[]> {
    return this.http.get<TipoCombustible[]>(this.apiUrl);
  }

  getById(id: number): Observable<TipoCombustible> {
    return this.http.get<TipoCombustible>(`${this.apiUrl}/${id}`);
  }

  create(tipoCombustible: TipoCombustible): Observable<TipoCombustible> {
    return this.http.post<TipoCombustible>(this.apiUrl, tipoCombustible);
  }

  update(id: number, tipoCombustible: TipoCombustible): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, tipoCombustible);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
