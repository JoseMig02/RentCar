import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/environment';


@Injectable({
  providedIn: 'root'
})
export class ReporteService {

    private apiUrl = `${environment.apiUrl}/reportes`;

  constructor(private http: HttpClient) { }

  generarReporteEntreFechas(fechaInicio: string, fechaFin: string): Observable<Blob> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio)
      .set('fechaFin', fechaFin);

    return this.http.get(`${this.apiUrl}/reporte/fechas`, { params, responseType: 'blob' });
  }

  generarReportePorTipoVehiculo(idTipoVehiculo: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/reporte/tipo-vehiculo/${idTipoVehiculo}`, { responseType: 'blob' });
  }
}
