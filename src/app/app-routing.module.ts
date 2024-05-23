import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NofoundComponent } from './shared/components/nofound/nofound.component';
import { MarcaListComponent } from './features/empleado/components/marca-list/marca-list.component';
import { TipoVehiculoComponent } from './features/empleado/components/tipovehiculo/tipovehiculo.component';
import { TipoCombustibleComponent } from './features/empleado/components/tipo-combustible/tipo-combustible.component';
import { ModeloComponent } from './features/empleado/components/modelo/modelo.component';
import { SigninComponent } from './features/empleado/components/signin/signin.component';
import { VehiculoComponent } from './features/empleado/components/vehiculo/vehiculo.component';
import { EmpleadoComponent } from './features/empleado/components/empleado/empleado.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'empleado/marcas', component: MarcaListComponent },
      { path: 'empleado/tiposVehiculos', component: TipoVehiculoComponent },
      { path: 'empleado/tiposCombustible', component: TipoCombustibleComponent },
      { path: 'empleado/modelos', component: ModeloComponent },
      { path: 'empleado/signIn', component: SigninComponent },
      { path: 'empleado/vehiculos', component: VehiculoComponent },
      { path: 'empleado/empleados', component: EmpleadoComponent },
      // otras rutas dentro del layout
    ]
  },
  { path: 'empleado', loadChildren: () => import('../app/features/empleado/empleado/empleado.module').then(m => m.EmpleadoModule) },

  // Catch-all route for 404 - Not Found
  { path: '**', component: NofoundComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
