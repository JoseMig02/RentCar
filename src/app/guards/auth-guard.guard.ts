import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {  EmpleadoService } from '../services/empleado.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private EmpleadoService: EmpleadoService, private router: Router,
    private messageService: MessageService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Verificar si el usuario está autenticado
    if (this.EmpleadoService.isAuthenticated()) {
      // Usuario autenticado, permitir acceso a la ruta
      return true;
    } else {
      // Usuario no autenticado, redirigir a la página de inicio de sesión
      this.router.navigate(['/empleado/signIn'], { queryParams: { returnUrl: state.url } });
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Inicie Seccion', life: 4000 });
      return false;
    }
  }
}
