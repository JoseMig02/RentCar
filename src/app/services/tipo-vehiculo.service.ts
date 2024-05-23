// src/app/services/tipoVehiculo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/environment';
import { TipoVehiculo } from '../models/TipoVehiculo';

@Injectable({
  providedIn: 'root'
})
export class TipoVehiculoService {
  private apiUrl = `${environment.apiUrl}/tipoVehiculos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoVehiculo[]> {
    return this.http.get<TipoVehiculo[]>(`${this.apiUrl}`);
  }

  getById(id: number): Observable<TipoVehiculo> {
    return this.http.get<TipoVehiculo>(`${this.apiUrl}/${id}`);
  }

  create(tipoVehiculo: TipoVehiculo): Observable<TipoVehiculo> {
    return this.http.post<TipoVehiculo>(`${this.apiUrl}`, tipoVehiculo);
  }

  update(id: number, tipoVehiculo: TipoVehiculo): Observable<TipoVehiculo> {
    return this.http.put<TipoVehiculo>(`${this.apiUrl}/${id}`, tipoVehiculo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
