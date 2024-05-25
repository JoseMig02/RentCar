import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Cliente } from '../../../../models/Cliente';
import { ClienteService } from '../../../../services/cliente.service';


interface TipoPersona {
  label: string;
  value: string;
}
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  clientesForm: FormGroup;
  displayDialog: boolean = false;
  tipoPersona:TipoPersona[] | undefined

  estados: { label: string, value: string }[] = [
    { label: 'Activo', value: 'activo' },
    { label: 'Inactivo', value: 'inactivo' }
  ];


  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.clientesForm = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      noTarjetaCR: ['', Validators.required],
      limiteCredito: ['', Validators.required],
      tipoPersona: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClientes();
    this.tipoPersona = [
      { label: 'Física', value: 'Física' },
      {label: 'Jurídica', value: 'Jurídica' },
    
  ];
  }

  loadClientes(): void {
    this.clienteService.getAll().subscribe(
      data => {
        this.clientes = data;
      },
      error => {
        console.error('Error al cargar clientes:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar clientes' });
      }
    );
  }

  openNew(): void {
    this.clientesForm.reset();
    this.clientesForm.patchValue({
      id: null,
      nombre: '',
      cedula: '',
      noTarjetaCR: '',
      limiteCredito: '',
      tipoPersona: '',
      estado: null
    });
    this.displayDialog = true;
  }

  editCliente(cliente: Cliente): void {
    this.clientesForm.patchValue(cliente);
    this.displayDialog = true;
  }

  deleteCliente(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este cliente?',
      header: 'Eliminar Cliente',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.clienteService.delete(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Cliente eliminado' });
            this.loadClientes();
          },
          error => {
            console.error('Error al eliminar cliente:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar cliente' });
          }
        );
      }
    });
  }

  hideDialog(): void {
    this.displayDialog = false;
  }

  saveCliente(): void {
    if (this.clientesForm.invalid) {
      this.clientesForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completar Campos' });
      return;
    }

    const cliente: Cliente = this.clientesForm.value;
    const operation = cliente.id ? 'actualizado' : 'creado';

    const serviceMethod = cliente.id ? this.clienteService.update(cliente.id, cliente) : this.clienteService.signUp(cliente);

    serviceMethod.subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Cliente ${operation}` });
        this.loadClientes();
        this.displayDialog = false;
      },
      (      error: any) => {
        console.error(`Error al ${operation} cliente:`, error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `Error al ${operation} cliente` });
      }
    );
  }

}


//   saveTipoVehiculo(): void {
//     if (this.clientesForm.invalid) {
//       this.clientesForm.markAllAsTouched();

//       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completar Campos', life: 2000 });
//       return;
//     }

//     if (this.clientesForm.valid) {
//       const tipoVehiculo: TipoVehiculo = this.clientesForm.value;
//       if (tipoVehiculo.id) {
//         this. clienteService.update(tipoVehiculo.id, tipoVehiculo).subscribe(() => {
//           this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo de vehículo actualizado', life: 2000 });
//           this.loadclientes();
//           this.displayDialog = false;
//         });
//       } else {
//         this. clienteService.create(tipoVehiculo).subscribe(() => {
//           this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo de vehículo creado' , life: 2000});
//           this.loadclientes();
//           this.displayDialog = false;
//         });
//       }

//     }
//   }

// }
