import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InspeccionService } from '../../../../services/inspeccion.service';
import { Inspeccion } from '../../../../models/Inspeccion';
import { MessageService, ConfirmationService } from 'primeng/api';
import { VehiculoService } from '../../../../services/vehiculos.service';
import { Vehiculo } from '../../../../models/Vehiculo';

interface Estado {
  label: string;
  value: string;
}
@Component({
  selector: 'app-inspeccion',
  templateUrl: './inspeccion.component.html',
  styleUrls: ['./inspeccion.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class InspeccionComponent implements OnInit {
  inspeccionForm: FormGroup;
  inspecciones: Inspeccion[] = [];
  vehiculos: Vehiculo[] =[];
  clientes:any[]=[]
  displayDialog: boolean = false;
  isNew: boolean = false;
  selectedInspeccion:any
  estados: Estado[]=[]

  constructor(
    private fb: FormBuilder,
    private inspeccionService: InspeccionService,
    private vehiculoService: VehiculoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.inspeccionForm = this.fb.group({
      tieneRalladuras: [false, Validators.required],
      cantidadCombustible: ['', Validators.required],
      tieneGomaRespuesta: [false, Validators.required],
      tieneGato: [false, Validators.required],
      tieneRoturasCristal: [false, Validators.required],
      estadoGomas: ['', Validators.required],
      lucesFuncionando: [false, Validators.required],
      liquidoFrenos: ['', Validators.required],
      presionNeumaticos: ['', Validators.required],
      nivelAceite: ['', Validators.required],
      observaciones: [''],
      fecha: ['', Validators.required],
      idVehiculo: ['', Validators.required],
      idCliente: ['', Validators.required],
      idEmpleadoInspeccion: ['', Validators.required],
      estado: ['activo', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInspecciones();
    this.loadVehiculos();
    this.estados = [
      { label: 'Activo', value: 'activo' },
      { label: 'Inactivo', value: 'inactivo' },

    ];
  }

  loadInspecciones(): void {
    this.inspeccionService.getAllInspecciones().subscribe((data: Inspeccion[]) => {
      this.inspecciones = data;
    });
  }
  loadVehiculos(): void {
    this.vehiculoService.getAll().subscribe((data: Vehiculo[]) => {
      this.vehiculos = data;

    });
  }

  openNew(): void {
    this.isNew = true;
    this.inspeccionForm.reset();
    this.displayDialog = true;
  }

  editInspeccion(inspeccion: Inspeccion): void {
    this.isNew = false;
    this.inspeccionForm.patchValue(inspeccion);
    this.selectedInspeccion = inspeccion;
    this.displayDialog = true;
  }

  deleteInspeccion(id: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta inspección?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.inspeccionService.deleteInspeccion(id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Inspección eliminada' });
          this.loadInspecciones();
        });
      }
    });
  }

  saveInspeccion(): void {
    if (this.inspeccionForm.invalid) {
      console.log(this.inspeccionForm.value)
      this.inspeccionForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete los campos obligatorios' });
      return;
    }

    const inspeccion = this.inspeccionForm.value as Inspeccion;
    console.log(inspeccion)

    if (this.isNew) {
      console.log(inspeccion)
      this.inspeccionService.createInspeccion(inspeccion).subscribe(createdInspeccion => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Inspección creada' });
        this.displayDialog = false;
        this.loadInspecciones();
      });
    } else if (this.selectedInspeccion) {
      this.inspeccionService.updateInspeccion(this.selectedInspeccion.id, inspeccion).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Inspección actualizada' });
        this.displayDialog = false;
        this.loadInspecciones();
      });
    }
  }

  hideDialog(): void {
    this.displayDialog = false;
  }
}
