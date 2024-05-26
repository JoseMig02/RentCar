import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { RentaDevolucionService } from '../../../../services/renta_devoluciones.service';
import { RentaDevolucion } from '../../../../models/RentaDevolucion';
import { EmpleadoService } from '../../../../services/empleado.service';
import { error } from 'console';
import { VehiculoService } from '../../../../services/vehiculos.service';
import { ClienteService } from '../../../../services/cliente.service';
import { Vehiculo } from '../../../../models/Vehiculo';
import { Cliente } from '../../../../models/Cliente';

@Component({
  selector: 'app-renta-devolucion',
  templateUrl: './renta-devolucion.component.html',
  styleUrls: ['./renta-devolucion.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RentaDevolucionComponent implements OnInit {
  rentas: RentaDevolucion[] = [];
  vehiculos: Vehiculo[] = [];
  clientes: Cliente[] = [];
  rentaForm: FormGroup;
  displayDialog: boolean = false;
  estados: { label: string, value: string }[] = [
    { label: 'Renta', value: 'renta' },
    { label: 'Devolución', value: 'devolucion' }
  ];
  estadosPago: { label: string, value: string }[] = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'Pagado', value: 'pagado' }
  ];
  maxDate: Date | undefined;
  minDate: Date | undefined;
  editMode: boolean =false;

    // Filters
    filterClienteId: number | undefined ;
    filterFechaInicio: Date | null = null;
    filterFechaFin: Date | null = null;
    filterFecha: Date | null = null;
    filterVehiculoId: number | undefined;

  constructor(
    private rentaDevolucionService: RentaDevolucionService,
    private empleadoService: EmpleadoService,
    private vehiculoService: VehiculoService,
    private clienteService: ClienteService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.rentaForm = this.fb.group({
      id: [null],
      noRenta: [null, Validators.required],
      fechaRenta: [null, Validators.required],
      fechaDevolucion: [null],
      montoXDia: [null, Validators.required],
      cantidadDias: [null, Validators.required],
      comentario: [''],
      estado: ['renta', Validators.required],
      totalPago: [null, Validators.required],
      estadoPago: ['pendiente', Validators.required],
      idVehiculo: [null, Validators.required],
      idCliente: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRentas()
    this.loadClientes()
    this.loadVehiculos()
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);

  }

  loadRentas(): void {
    this.rentaDevolucionService.consultarTodasLasRentas().subscribe((data: RentaDevolucion[]) => {
      this.rentas = data;
    },
      error => {
        console.error('Error creando la renta:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar las rentas' });
      });
  }
  loadVehiculos(): void {
    this.vehiculoService.getAll().subscribe((data: Vehiculo[]) => {
      this.vehiculos = data;

    },
    error => {
      console.error('Error al cargar los vehiculos:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar los vehiculos' });
    });
   
  }

  loadClientes(): void {
    this.clienteService.getAll().subscribe((data: Cliente[]) => {
      this.clientes = data
    },
    error => {
      console.error('Error al cargar los clientes:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar los vehiculos' });
    })
  }

  openNew(): void {
    this.rentaForm.reset();
    this.displayDialog = true;
    this.editMode = false; // Set editMode to false for new entry
  }
  
  editRenta(renta: RentaDevolucion): void {
    this.rentaForm.patchValue(renta);
    this.displayDialog = true;
    this.editMode = true; // Set editMode to true for editing
  }

  // deleteRenta(id: number): void {
  //   this.confirmationService.confirm({
  //     message: '¿Está seguro de que desea eliminar esta renta?',
  //     header: 'Confirmación de eliminación',
  //     icon: 'pi pi-info-circle',
  //     acceptButtonStyleClass: "p-button-danger p-button-text",
  //     rejectButtonStyleClass: "p-button-text",
  //     accept: () => {
  //       this.rentaDevolucionService.delete(id).subscribe(() => {
  //         this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Renta eliminada' });
  //         this.loadRentas();
  //       });
  //     }
  //   });
  // }

  hideDialog(): void {
    this.displayDialog = false;
  }

  saveRenta(): void {
    if (this.rentaForm.invalid) {
      this.rentaForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completar Campos', life: 2000 });
      return;
    }
  
    const renta: RentaDevolucion = this.rentaForm.value;
    const empleadoId = JSON.stringify(this.empleadoService.getEmployeeId());
    if (empleadoId) {
      renta.idEmpleado = JSON.parse(empleadoId);
    }
  
    if (this.editMode) {
      console.log('actualizado')
      this.updateRenta(renta);
    } else {
      this.createRenta(renta);
    }
  }
  

  createRenta(renta: RentaDevolucion): void {
    if (this.rentaForm.invalid) {
      this.rentaForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completar Campos', life: 2000 });
      return;
    }

    const empleadoId = JSON.stringify(this.empleadoService.getEmployeeId());
    if (empleadoId) {
      renta.idEmpleado = JSON.parse(empleadoId);
    }

    this.rentaDevolucionService.createRenta(renta).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Renta creada' });
        this.loadRentas()
        this.displayDialog = false;
      },
      error: (err) => {
        console.error('Error creando la renta:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    });
  }

  updateRenta(renta: RentaDevolucion): void {
    if (this.rentaForm.invalid) {
      this.rentaForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completar Campos', life: 2000 });
      return;
    }
    this.rentaDevolucionService.updateRenta(renta.id, renta).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Renta actualizada' });
        this.loadRentas()
        this.displayDialog = false;
      },
      error: (err) => {
        console.error('Error actualizando la renta:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la renta' });
      }
    });
  }

  filterRentas(): void {
    if (this.filterClienteId) {
      this.rentaDevolucionService.consultarRentasPorCliente(this.filterClienteId).subscribe(
        (data: RentaDevolucion[]) => this.rentas = data,
        error => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al filtrar por cliente' })
      );
    } else if (this.filterFechaInicio && this.filterFechaFin) {
      const fechaInicio = this.filterFechaInicio.toISOString().split('T')[0];
      const fechaFin = this.filterFechaFin.toISOString().split('T')[0];
      this.rentaDevolucionService.consultarRentasEntreFechas(fechaInicio, fechaFin).subscribe(
        (data: RentaDevolucion[]) => this.rentas = data,
        error => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al filtrar entre fechas' })
      );
    } else if (this.filterFecha) {
      const fecha = this.filterFecha.toISOString().split('T')[0];
      this.rentaDevolucionService.consultarRentasEnFecha(fecha).subscribe(
        (data: RentaDevolucion[]) => this.rentas = data,
        error => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al filtrar por fecha' })
      );
    } else if (this.filterVehiculoId) {
      this.rentaDevolucionService.consultarRentasPorVehiculo(this.filterVehiculoId).subscribe(
        (data: RentaDevolucion[]) => this.rentas = data,
        error => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al filtrar por vehículo' })
      );
    } else {
      this.loadRentas();
    }
  }
  clearFilters(): void {
    this.filterClienteId = undefined;
    this.filterFechaInicio = null;
    this.filterFechaFin = null;
    this.filterFecha = null;
    this.filterVehiculoId = undefined;
    this.loadRentas(); // Recargar las rentas después de limpiar los filtros
  }
  
}
