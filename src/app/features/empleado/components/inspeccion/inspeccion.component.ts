import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InspeccionService } from '../../../../services/inspeccion.service';
import { Inspeccion } from '../../../../models/Inspeccion';
import { MessageService, ConfirmationService } from 'primeng/api';
import { VehiculoService } from '../../../../services/vehiculos.service';
import { Vehiculo } from '../../../../models/Vehiculo';
import { Cliente } from '../../../../models/Cliente';
import { ClienteService } from '../../../../services/cliente.service';
import { EmpleadoService } from '../../../../services/empleado.service';
import { json } from 'express';

interface inspeccion {
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
  vehiculos: Vehiculo[] = [];
  clientes: Cliente[] = [];
  displayDialog: boolean = false;
  isNew: boolean = false;
  selectedInspeccion: any
  estados: inspeccion[] = []
  cantidadCombustible:inspeccion[]=[]
  liquidoFrenos: inspeccion[] = []
  presionNeumaticos:inspeccion[]=[]
  nivelAceite:inspeccion[]=[]

  constructor(
    private fb: FormBuilder,
    private inspeccionService: InspeccionService,
    private vehiculoService: VehiculoService,
    private clienteService: ClienteService,
    private empleadoService: EmpleadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.inspeccionForm = this.fb.group({
      tieneRalladuras: [false],
      cantidadCombustible: ['', Validators.required],
      tieneGomaRespuesta: [false],
      tieneGato: [false],
      tieneRoturasCristal: [false],
      estadoGomas: ['', Validators.required],
      lucesFuncionando: [false],
      liquidoFrenos: ['', Validators.required],
      presionNeumaticos: ['', Validators.required],
      nivelAceite: ['', Validators.required],
      observaciones: [''],
      fecha: ['', Validators.required],
      idVehiculo: ['', Validators.required],
      idCliente: ['', Validators.required],
      estado: ['activo', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInspecciones();
    this.loadVehiculos();
    this.loadClientes();
    this.estados = [
      { label: 'Activo', value: 'activo' },
      { label: 'Inactivo', value: 'inactivo' },
    ];
    this.cantidadCombustible = [
      { label: '1/4', value: '1/4' },
      { label: '1/2', value: '1/2' },
      { label: '3/4', value: '3/4' },
      { label: 'Lleno', value: 'lleno' }
    ];
    this.liquidoFrenos = [
      { label: 'Bajo', value: 'bajo' },
      { label: 'Medio', value: 'medio' },
      { label: 'Alto', value: 'alto' }
    ]
    this.presionNeumaticos = [
      { label: 'Baja', value: 'baja' },
      { label: 'Normal', value: 'normal' },
      { label: 'Alta', value: 'alta' }
    ]
    this.nivelAceite = [
      { label: 'Bajo', value: 'bajo' },
      { label: 'Medio', value: 'medio' },
      { label: 'Alto', value: 'alto' }
    ]
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

  loadClientes(): void {
    this.clienteService.getAll().subscribe((data: Cliente[]) => {
      this.clientes = data.filter(cliente => cliente.estado === 'activo')
    })
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
      this.inspeccionForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete los campos obligatorios', life: 2000  });
      return;
    }

    const inspeccion = this.inspeccionForm.value as Inspeccion;
    const empleadoId = this.empleadoService.getEmployeeId();
    if (empleadoId) {
      inspeccion.idEmpleadoInspeccion = JSON.parse(empleadoId);
    }
    // Verificación de campos checkbox
    inspeccion.tieneRalladuras = inspeccion.tieneRalladuras || false;
    inspeccion.tieneGomaRespuesta = inspeccion.tieneGomaRespuesta || false;
    inspeccion.tieneGato = inspeccion.tieneGato || false;
    inspeccion.tieneRoturasCristal = inspeccion.tieneRoturasCristal || false;
    inspeccion.lucesFuncionando = inspeccion.lucesFuncionando || false;

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
