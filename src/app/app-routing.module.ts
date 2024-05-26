import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NofoundComponent } from './shared/components/nofound/nofound.component';
import { MarcaListComponent } from './features/empleado/components/marca-list/marca-list.component';
import { TipoVehiculoComponent } from './features/empleado/components/tipovehiculo/tipovehiculo.component';
import { TipoCombustibleComponent } from './features/empleado/components/tipo-combustible/tipo-combustible.component';
import { ModeloComponent } from './features/empleado/components/modelo/modelo.component';
import { SigninComponent } from './features/empleado/components/signin/signin.component';
import { VehiculoComponent } from './features/empleado/components/vehiculo/vehiculo.component';
import { EmpleadoComponent } from './features/empleado/components/empleado/empleado.component';
import { InspeccionComponent } from './features/empleado/components/inspeccion/inspeccion.component';
import { ClienteComponent } from './features/empleado/components/cliente/cliente.component';
import { RentaDevolucionComponent } from './features/empleado/components/renta-devolucion/renta-devolucion.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { AdminGuard } from './guards/admin-guard.guard';
import { OnlyAdminGuard } from './guards/admin.guard';
import { AccessComponent } from './shared/components/access/access.component';
import { ReporteComponent } from './features/empleado/components/reporte/reporte.component';


const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard, AdminGuard], // Protege todas las rutas bajo este layout
    children: [
      { path: 'empleado/marcas', component: MarcaListComponent },
      { path: 'empleado/tiposVehiculos', component: TipoVehiculoComponent },
      { path: 'empleado/tiposCombustible', component: TipoCombustibleComponent },
      { path: 'empleado/modelos', component: ModeloComponent },
      { path: 'empleado/vehiculos', component: VehiculoComponent },
      { path: 'empleado/empleados', component: EmpleadoComponent, canActivate:[OnlyAdminGuard] }, // Requiere ser administrador
      { path: 'empleado/inspecciones', component: InspeccionComponent },
      { path: 'empleado/cliente', component: ClienteComponent },
      { path: 'empleado/rentaDevolucion', component: RentaDevolucionComponent },
      // { path: 'empleado/reportes', component: ReporteComponent },
      // Otras rutas dentro del layout
    ]
  },
  { path: 'empleado', loadChildren: () => import('../app/features/empleado/empleado/empleado.module').then(m => m.EmpleadoModule) },
  
  // Ruta por defecto que carga el componente SigninComponent
  { path: '', redirectTo: '/empleado/signIn', pathMatch: 'full' },
  
  // Ruta para el componente SigninComponent
  { path: 'empleado/signIn', component: SigninComponent },
    // Ruta para el componente AccessDeniedComponent
    { path: 'access-denied', component:AccessComponent },

  // Catch-all route for 404 - Not Found
  { path: '**', component: NofoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
