import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../services/empleado.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private empleadoService: EmpleadoService, private router: Router,
    private messageService: MessageService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {

    // Verificar si el usuario está autenticado
    if (this.empleadoService.isAuthenticated()) {
      // Verificar si el usuario es administrador
      if ( this.empleadoService.isAdmin()) {
        // Usuario autenticado y es administrador, permitir acceso a la ruta
        return true;
      } else {
        // Usuario autenticado pero no es administrador, verificar si es empleado
        const isEmpleado = this.empleadoService.isEmpleado();
        if (isEmpleado) {
          // Usuario autenticado y es empleado, permitir acceso a la ruta
          return true;
        } else {
          // Usuario autenticado pero ni es administrador ni empleado, redirigir a la página de inicio de sesión
          this.router.navigate(['/access-denied']);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Contact the administrator', life: 2000 });
          return false
        }
      }
    } else {
      // Usuario no autenticado, redirigir a la página de inicio de sesión
      this.router.createUrlTree(['/empleado/signIn']);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Inicie Seccion', life: 2000 });
      return false
    }
  }
}
