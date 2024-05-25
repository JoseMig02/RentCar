// src/app/components/tipoVehiculo/tipoVehiculo.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TipoVehiculoService } from '../../../../services/tipo-vehiculo.service';
import { TipoVehiculo } from '../../../../models/TipoVehiculo';

@Component({
  selector: 'app-tipo-vehiculo',
  templateUrl: './tipoVehiculo.component.html',
  styleUrls: ['./tipoVehiculo.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TipoVehiculoComponent implements OnInit {
  tipoVehiculos: TipoVehiculo[] = [];
  selectedTipoVehiculos: TipoVehiculo[] = [];
  tipoVehiculoForm: FormGroup;
  displayDialog: boolean = false;
  estados: { label: string, value: string }[] = [
    { label: 'Activo', value: 'activo' },
    { label: 'Inactivo', value: 'inactivo' }
  ];

  constructor(
    private tipoVehiculoService: TipoVehiculoService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.tipoVehiculoForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTipoVehiculos();
  }


  loadTipoVehiculos(): void {
    this.tipoVehiculoService.getAll().subscribe(
      data => {
        this.tipoVehiculos = data;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar los tipos de vehículo', life: 2000 });
      }
    );
  }

  openNew(): void {
    this.tipoVehiculoForm.reset();
    this.tipoVehiculoForm.patchValue({
      id: null,
      nombre: '',
      descripcion: '',
      estado: null
    });
    this.displayDialog = true;
  }

  editTipoVehiculo(tipoVehiculo: TipoVehiculo): void {
    this.tipoVehiculoForm.patchValue(tipoVehiculo);
    this.displayDialog = true;
  }

  deleteTipoVehiculo(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este tipo de vehículo?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      accept: () => {
        this.tipoVehiculoService.delete(id).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo de vehículo eliminado',life: 4000 });
            this.loadTipoVehiculos();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el tipo de vehículo', life: 2000 });
          }
        );
      }
    });
  }

  hideDialog(): void {
    this.displayDialog = false;
  }

  saveTipoVehiculo(): void {
    if (this.tipoVehiculoForm.invalid) {
      this.tipoVehiculoForm.markAllAsTouched();

      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completar Campos', life: 2000 });
      return;
    }

    if (this.tipoVehiculoForm.valid) {
      const tipoVehiculo: TipoVehiculo = this.tipoVehiculoForm.value;
      if (tipoVehiculo.id) {
        this.tipoVehiculoService.update(tipoVehiculo.id, tipoVehiculo).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo de vehículo actualizado', life: 2000 });
          this.loadTipoVehiculos();
          this.displayDialog = false;
        });
      } else {
        this.tipoVehiculoService.create(tipoVehiculo).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo de vehículo creado' , life: 2000});
          this.loadTipoVehiculos();
          this.displayDialog = false;
        });
      }

    }
  }
}
