import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentaDevolucion } from '../models/RentaDevolucion';
import { environment } from '../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class RentaDevolucionService {
  private apiUrl = `${environment.apiUrl}/renta`;
  private apiUrlconsult = `${environment.apiUrl}/consulta/rentas`;


  constructor(private http: HttpClient) { }

  // Crear una nueva renta
  createRenta(renta: RentaDevolucion): Observable<any> {
    return this.http.post<RentaDevolucion>(`${this.apiUrl}/rents`, renta);
  }

  // Actualizar una renta existente
  updateRenta(id: number, renta:RentaDevolucion): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/rents/${id}`, renta);
  }

  // Consultar rentas por cliente
  consultarRentasPorCliente(clienteId: number): Observable<RentaDevolucion[]> {
    return this.http.get<RentaDevolucion[]>(`${this.apiUrlconsult}/cliente/${clienteId}`);
  }

  // Consultar rentas entre fechas
  consultarRentasEntreFechas(fechaInicio: string, fechaFin: string): Observable<RentaDevolucion[]> {
    return this.http.get<RentaDevolucion[]>(`${this.apiUrlconsult}/fechas`, {
      params: {
        fechaInicio,
        fechaFin
      }
    });
  }

  // Consultar rentas en una fecha específica
  consultarRentasEnFecha(fecha: string): Observable<RentaDevolucion[]> {
    return this.http.get<RentaDevolucion[]>(`${this.apiUrlconsult}/fecha`, {
      params: {
        fecha
      }
    });
  }

  // Consultar todas las rentas
  consultarTodasLasRentas(): Observable<RentaDevolucion[]> {
    return this.http.get<RentaDevolucion[]>(`${this.apiUrlconsult}`);
  }

  // Consultar rentas por vehículo
  consultarRentasPorVehiculo(vehiculoId: number): Observable<RentaDevolucion[]> {
    return this.http.get<RentaDevolucion[]>(`${this.apiUrlconsult}/vehiculo/${vehiculoId}`);
  }
}
