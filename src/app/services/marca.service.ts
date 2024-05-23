
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../models/Marca';
import { environment } from '../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private apiUrl = `${environment.apiUrl}/marca`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Marca[]> {
    return this.http.get<Marca[]>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.apiUrl}/${id}`);
  }

  create(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(`${this.apiUrl}/`, marca);
  }

  update(id: number, marca: Marca): Observable<Marca> {
    return this.http.put<Marca>(`${this.apiUrl}/${id}`, marca);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(id:any, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    return this.http.post<any>(`${this.apiUrl}/${id}/image`, formData);
  }

  getImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/image`, { responseType: 'blob' });
  }
}
