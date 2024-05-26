import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment/environment';
import { Observable, tap } from 'rxjs';
import { Empleado, Empleadologin } from '../models/Empleado';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = `${environment.apiUrl}/empleados`;

  constructor(private http: HttpClient) { }

  getAllEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.apiUrl}`);
  }

  getEmpleadoById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  signup(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.apiUrl}/signup`, empleado);
  }

  signin(empleado: Empleadologin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, empleado).pipe(
      tap(response => {
        if (response.token) {
          const decodedToken: any = jwtDecode(response.token);
          const empleadoId = decodedToken.empleadoId  ; // Asegúrate de que el ID del empleado esté presente en el token
          const role = decodedToken.role

          localStorage.setItem('authToken', response.token);
          localStorage.setItem('employeeId', empleadoId); // Almacenar el ID del empleado
          localStorage.setItem('role',role)
        }
      })
    );
  }
  createEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.apiUrl}`, empleado);
  }

  updateEmpleado(id: string, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.apiUrl}/${id}`, empleado);
  }

  deleteEmpleado(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  
  signOut(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('employeeId');
  }

  getEmployeeId(): string | null {
    return localStorage.getItem('employeeId');
  }

  // Método adicional para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
  // Método para verificar si el usuario es administrador
  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'admin';
  }

  // Método para verificar si el usuario es empleado
  isEmpleado(): boolean {
    const role = localStorage.getItem('role');
    return role === 'empleado';
  }
  
  
}


