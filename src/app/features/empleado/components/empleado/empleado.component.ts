import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../../services/empleado.service';
import { Empleado } from '../../../../models/Empleado';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Estado {
  label: string;
  value: string;
}

interface TandaLabor {
  label: string;
  value: string;
}
interface Rol {
  label: string;
  value: string;
}

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class EmpleadoComponent implements OnInit {

  empleados: Empleado[] = [];
  displayDialog: boolean = false;
  empleadoForm: FormGroup;
  isNew: boolean = false;
  selectedEmpleados: Empleado[] = [];
  estados: Estado[] | undefined;
  tandaLabor: TandaLabor[] | undefined;
  rol: Rol[] | undefined

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.empleadoForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      tandaLabor: ['', Validators.required],
      porcentajeComision: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      fechaIngreso: ['', Validators.required],
      estado: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEmpleados();
    this.estados = [
      { label: 'Activo', value: 'activo' },
      { label: 'Inactivo', value: 'inactivo' }
    ];
    this.tandaLabor = [
      { label: 'Matutina', value: 'Matutina' },
      { label: 'Vespertina', value: 'Vespertina' },
      { label: 'Nocturna', value: 'Nocturna' }
    ];
    this.rol = [
      { label: 'Empleado', value: 'empleado' },
      { label: 'Admin', value: 'admin' },
      { label: 'Pendiente', value: 'pendiente' }

    ]
  }

  loadEmpleados(): void {
    this.empleadoService.getAllEmpleados().subscribe((data: Empleado[]) => {
      this.empleados = data;
    });
  }

  openNew(): void {
    this.isNew = true;
    this.empleadoForm.reset();
    this.displayDialog = true;
  }

  editEmpleado(empleado: Empleado): void {
    this.isNew = false;
    this.empleadoForm.patchValue({ ...empleado });
    this.displayDialog = true;
  }

  deleteEmpleado(id: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este empleado?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      accept: () => {
        this.empleadoService.deleteEmpleado(id.toString()).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Empleado eliminado' });
          this.loadEmpleados();
        });
      }
    });
  }

  saveEmpleado(): void {
    if (this.empleadoForm.invalid) {
      this.empleadoForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completar Campos', life: 2000 });
      return;
    }

    const empleado = this.empleadoForm.value as Empleado;

    if (this.isNew) {
      console.log(empleado)
      this.empleadoService.createEmpleado(empleado).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Empleado creado' });
        this.displayDialog = false;
        this.loadEmpleados();
      });
    } else {
      this.empleadoService.updateEmpleado(empleado.id.toString(), empleado).subscribe(() => {
        console.log(empleado)
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Empleado actualizado' });
        this.displayDialog = false;
        this.loadEmpleados();
      });
    }
  }

  hideDialog(): void {
    this.displayDialog = false;
  }

  deleteSelectedEmpleados(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar los empleados seleccionados?',
      accept: () => {
        const deleteRequests = this.selectedEmpleados.map(empleado => this.empleadoService.deleteEmpleado(empleado.id.toString()));
        Promise.all(deleteRequests).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Empleados eliminados' });
          this.loadEmpleados();
          this.selectedEmpleados = [];
        });
      }
    });
  }
}
