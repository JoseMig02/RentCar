import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './empleado-routing.module';
import { SignupComponent } from '../components/signup/signup.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SigninComponent } from '../components/signin/signin.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MarcaListComponent } from '../components/marca-list/marca-list.component';
import { MessagesModule } from 'primeng/messages';

import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TipoVehiculoComponent } from '../components/tipovehiculo/tipovehiculo.component';
import { TipoCombustibleComponent } from '../components/tipo-combustible/tipo-combustible.component';
import { ModeloComponent } from '../components/modelo/modelo.component';
import { VehiculoComponent } from '../components/vehiculo/vehiculo.component';
import { EmpleadoComponent } from '../components/empleado/empleado.component';
import { InspeccionComponent } from '../components/inspeccion/inspeccion.component';
import { PanelModule } from 'primeng/panel';
import { ClienteComponent } from '../components/cliente/cliente.component';
import { RentaDevolucionComponent } from '../components/renta-devolucion/renta-devolucion.component';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    MarcaListComponent,
    TipoVehiculoComponent,
    TipoCombustibleComponent,
    ModeloComponent,
    VehiculoComponent,
    EmpleadoComponent,
    InspeccionComponent,
    ClienteComponent,
    RentaDevolucionComponent


  ],
  imports: [
    CommonModule,
    EmpleadoRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    HttpClientModule,
    DialogModule,
    TableModule,
    ConfirmDialogModule,
    RatingModule,
    ToolbarModule,
    FileUploadModule,
    InputTextareaModule,
    TagModule,
    PanelModule,
    ImageModule



],
exports: [MarcaListComponent,ToastModule],
  providers: [MessageService,ConfirmationService]
})
export class EmpleadoModule { }
