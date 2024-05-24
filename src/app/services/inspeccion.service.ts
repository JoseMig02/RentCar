import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/environment';
import { Inspeccion } from '../models/Inspeccion';

@Injectable({
  providedIn: 'root'
})
export class InspeccionService {
  private apiUrl = `${environment.apiUrl}/inspeccion/inspecciones`;

  constructor(private http: HttpClient) { }

  getAllInspecciones(): Observable<Inspeccion[]> {
    return this.http.get<Inspeccion[]>(this.apiUrl);
  }

  getInspeccionById(id: number): Observable<Inspeccion> {
    return this.http.get<Inspeccion>(`${this.apiUrl}/${id}`);
  }

  createInspeccion(inspeccion: Inspeccion): Observable<Inspeccion> {
    return this.http.post<Inspeccion>(this.apiUrl, inspeccion);
  }

  updateInspeccion(id: number, inspeccion: Inspeccion): Observable<Inspeccion> {
    return this.http.put<Inspeccion>(`${this.apiUrl}/${id}`, inspeccion);
  }

  deleteInspeccion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
