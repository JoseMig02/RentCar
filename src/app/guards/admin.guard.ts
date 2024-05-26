import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../services/empleado.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class OnlyAdminGuard implements CanActivate {

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private messageService: MessageService
  ) {}

 canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Verificar si el usuario está autenticado
    if (this.empleadoService.isAuthenticated()) {
      // Verificar si el usuario es administrador
      if ( this.empleadoService.isAdmin()) {
        // Usuario autenticado y es administrador, permitir acceso a la ruta
        return true;
      } else {
        // Usuario autenticado pero no es administrador, redirigir a acceso denegado
        this.router.navigate(['/access-denied']);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Contact the administrator, you are not authorized',
          life: 2000
        });
        return false;
      }
    } else {
      // Usuario no autenticado, redirigir a la página de inicio de sesión
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Inicie sesión',
        life: 4000
      });
       this.router.navigate(['/empleado/signIn']);
       return false
    }
  }
}
