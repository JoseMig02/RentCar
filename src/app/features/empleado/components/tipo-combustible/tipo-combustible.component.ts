import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoCombustible } from '../../../../models/TipoCombustible';
import { TipoCombustibleService } from '../../../../services/tipoCombustible.service';

@Component({
  selector: 'app-tipo-combustible',
  templateUrl: './tipo-combustible.component.html',
  styleUrls: ['./tipo-combustible.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TipoCombustibleComponent implements OnInit {
  tiposCombustible: TipoCombustible[] = [];
  selectedTiposCombustible: TipoCombustible[] = [];
  tipoCombustibleForm: FormGroup;
  displayDialog: boolean = false;
  estados: { label: string, value: string }[] = [
    { label: 'Activo', value: 'activo' },
    { label: 'Inactivo', value: 'inactivo' }
  ];

  constructor(
    private tipoCombustibleService: TipoCombustibleService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.tipoCombustibleForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      esElectrico: [false, Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTiposCombustible();
  }

  loadTiposCombustible(): void {
    this.tipoCombustibleService.getAll().subscribe(data => {
      this.tiposCombustible = data;
    });
  }

  openNew(): void {
    this.tipoCombustibleForm.reset();
    this.displayDialog = true;
  }

  editTipoCombustible(tipoCombustible: TipoCombustible): void {
    this.tipoCombustibleForm.patchValue(tipoCombustible);
    this.displayDialog = true;
  }

  deleteTipoCombustible(id: number): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar este tipo de combustible?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.tipoCombustibleService.delete(id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo de combustible eliminado' });
          this.loadTiposCombustible();
        });
      }
    });
  }

  hideDialog(): void {
    this.displayDialog = false;
  }

  saveTipoCombustible(): void {
    if (this.tipoCombustibleForm.invalid) {
      this.tipoCombustibleForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completar Campos', life: 2000 });
      return;
    }

    const tipoCombustible: TipoCombustible = this.tipoCombustibleForm.value;
    if (tipoCombustible.id) {
      this.tipoCombustibleService.update(tipoCombustible.id, tipoCombustible).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo de combustible actualizado' });
        this.loadTiposCombustible();
        this.displayDialog = false;
      });
    } else {
      this.tipoCombustibleService.create(tipoCombustible).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Tipo de combustible creado' });
        this.loadTiposCombustible();
        this.displayDialog = false;
      });
    }
  }
}
