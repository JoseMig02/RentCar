import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Modelo } from '../models/Modelo';
import { environment } from '../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {
    private apiUrl = `${environment.apiUrl}/modelo`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<Modelo> {
    return this.http.get<Modelo>(`${this.apiUrl}/${id}`);
  }

  create(modelo: Modelo): Observable<Modelo> {
    return this.http.post<Modelo>(`${this.apiUrl}`, modelo);
  }

  update(id: number, modelo: Modelo): Observable<Modelo> {
    return this.http.put<Modelo>(`${this.apiUrl}/${id}`, modelo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(id: number, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<any>(`${this.apiUrl}/${id}/image`, formData);
  }
}
