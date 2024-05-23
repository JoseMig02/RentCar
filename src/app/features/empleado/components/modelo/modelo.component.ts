import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../../../services/marca.service';
import { ModeloService } from '../../../../services/modelo.service';
import { Marca } from '../../../../models/Marca';
import { Modelo } from '../../../../models/Modelo';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

interface Estado {
  label: string;
  value: string;
}

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ModeloComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload!: FileUpload; // Agrega ViewChild
  modelos: Modelo[] = [];
  marcas: Marca[] = [];
  displayDialog: boolean = false;
  modeloForm: FormGroup;
  isNew: boolean = false;
  selectedModelos: Modelo[] = [];
  estados: Estado[] | undefined;
  selectedImage: File | null = null;
  selectedMarca: Marca | undefined;
  marcasMap: { [id: number]: string } = {};

  
  constructor(
    private fb: FormBuilder,
    private marcaService: MarcaService,
    private modeloService: ModeloService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.modeloForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      idMarca: ['', Validators.required],
      ano: ['', Validators.required],
      imagen: ['']
   
    });
  }

  ngOnInit(): void {
    this.loadModelos();
    this.loadMarcas();
    this.estados = [
      { label: 'activo', value: 'activo' },
      { label: 'inactivo', value: 'inactivo' }
    ];
  }

  loadModelos(): void {
    this.modeloService.getAll().subscribe((data: Modelo[]) => {
      this.modelos = data;
      this
      console.log(this.modelos)
    });
  }


  loadMarcas(): void {
    this.marcaService.getAll().subscribe((data: Marca[]) => {
      this.marcas = data;
      this.marcas.forEach(marca => {
        this.marcasMap[marca.id] = marca.nombre;
      });
    });
  }

  openNew(): void {
    this.isNew = true;
    this.modeloForm.reset();
    this.modeloForm.patchValue({ estado: 'activo' });
    this.displayDialog = true;
  }

  editModelo(modelo: Modelo): void {
    this.isNew = false;
    this.modeloForm.patchValue(modelo);
    this.displayDialog = true;
  }

  deleteModelo(id: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este modelo?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.modeloService.delete(id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Modelo eliminado' });
          this.loadModelos();
        });
      }
    });
  }

  saveModelo(): void {
    if (this.modeloForm.invalid) {
      this.modeloForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completar Campos', life: 2000 });
      return;
    }
  
    const modelo = this.modeloForm.value as Modelo;
  
    if (this.isNew) {
      this.modeloService.create(modelo).subscribe(createdModelo => {
        console.log(createdModelo)
        if (this.selectedImage) {
          this.modeloService.uploadImage(createdModelo.id, this.selectedImage).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Modelo creado' });
            this.loadModelos();
            this.displayDialog = false;
            this.fileUpload.clear(); // 
          });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Modelo creado sin imagen' });
          this.loadModelos();
          this.displayDialog = false;
        }
      });
    } else { // Escenario de actualización
      if (this.selectedImage) {
        // Subir imagen primero, luego actualizar modelo
        this.modeloService.uploadImage(modelo.id!, this.selectedImage).subscribe(() => {
          this.modeloService.update(modelo.id!, modelo).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Modelo actualizado' });
            this.loadModelos();
            this.displayDialog = false;
            this.fileUpload.clear(); //  // Limpiar imagen seleccionada después de la actualización
          });
        });
      } else {
        // Actualizar modelo sin cambiar imagen
        this.modeloService.update(modelo.id!, modelo).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Modelo actualizado' });
          this.loadModelos();
          this.displayDialog = false;
        });
      }
    }
  }
  
  hideDialog(): void {
    this.displayDialog = false;
  }

  deleteSelectedModelos(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar los modelos seleccionados?',
      accept: () => {
        const deleteRequests = this.selectedModelos.map(modelo => this.modeloService.delete(modelo.id!));
        Promise.all(deleteRequests).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Modelos eliminados' });
          this.loadModelos();
          this.selectedModelos = [];
        });
      }
    });
  }
 
  getMarcaNombreById(id: number): string {
    return this.marcasMap[id] || 'No disponible';
  }

  onImageSelect(event: any) {
    this.selectedImage = event.files[0];
  }
}
