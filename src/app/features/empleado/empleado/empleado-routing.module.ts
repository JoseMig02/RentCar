import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from '../components/signup/signup.component';
import { SigninComponent } from '../components/signin/signin.component';
import { MarcaListComponent } from '../components/marca-list/marca-list.component';
import { TipoVehiculoComponent } from '../components/tipovehiculo/tipovehiculo.component';
import { TipoCombustibleComponent } from '../components/tipo-combustible/tipo-combustible.component';
import { ModeloComponent } from '../components/modelo/modelo.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent } ,
  { path: 'signIn', component: SigninComponent},
  { path: 'marcas', component: MarcaListComponent},
  { path: 'tiposVehiculos', component:TipoVehiculoComponent},
  { path: 'tiposCombustible', component:TipoCombustibleComponent},
  { path: 'modelos', component:ModeloComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
