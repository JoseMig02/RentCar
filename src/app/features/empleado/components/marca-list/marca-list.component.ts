import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from '../../../../services/marca.service';
import { Marca } from '../../../../models/Marca';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';


interface Estado {
  label: string;
  value: string;
}
@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styleUrls: ['./marca-list.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class MarcaListComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload!: FileUpload; // Agrega ViewChild
  
  marcas: Marca[] = [];
  displayDialog: boolean = false;
  marcaForm: FormGroup;
  isNew: boolean = false;
  selectedMarcas: Marca[] = [];
  estados: Estado[] | undefined;
  marcass:any = []

  selectedImage: File | null = null;

  onImageSelect(event: any) {
    this.selectedImage = event.files[0];
  }

  constructor(
    private fb: FormBuilder,
    private marcaService: MarcaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.marcaForm = this.fb.group({
      id:[''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      imagen:['']
    });
  }

  ngOnInit(): void {

    this.loadMarcas();
    this.estados = [
      { label: 'Activo', value: 'activo' },
      {label: 'Inactivo', value: 'inactivo' },
    
  ];
  console.log(this.marcass)
  }

  loadMarcas(): void {
    this.marcaService.getAll().subscribe((data: Marca[]) => {
      this.marcas = data;
      console.log(this.marcas)
    });
  }

  openNew(): void {
    this.isNew = true;
    this.marcaForm.reset();
    this.marcaForm.patchValue({ estado: 'activo' });
    this.displayDialog = true;
  }

  editMarca( marca: Marca): void {
    this.isNew = false;
    console.log(marca)
   
    this.marcaForm.patchValue({ ...marca});
   
    this.displayDialog = true;
  }
  

  deleteMarca(id: number): void {
    console.log(id)
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta marca?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
      accept: () => {
        this.marcaService.delete(id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca eliminada' });
          this.loadMarcas();
        });
      }
    });
  }


  saveMarca(): void {
    if (this.marcaForm.invalid) {
      this.marcaForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completar Campos', life: 2000 });
      return;
    }

    const marca = this.marcaForm.value as Marca;

    if (this.isNew) {
      this.marcaService.create(marca)
        .subscribe(createdMarca => {
          console.log(createdMarca)
          if (this.selectedImage) {
            this.marcaService.uploadImage(createdMarca.id, this.selectedImage).subscribe(() => {
              
              this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca creada' });
              this.displayDialog = false;
              this.loadMarcas();
              this.fileUpload.clear(); // 
              this.selectedImage =null
            });
          } else {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca creada sin imagen' });
            this.loadMarcas();
            this.displayDialog = false;
          }
        });
    } else { // Update scenario
      if (this.selectedImage) {
        // Upload image first, then update marca
        this.marcaService.uploadImage(marca.id, this.selectedImage).subscribe(() => {
          this.marcaService.update(marca.id!, marca).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca actualizada' });
            this.loadMarcas();
            this.displayDialog = false;
            this.fileUpload.clear(); // 
            this.selectedImage =null
           
          });
        });
      } else {
        // Update marca without image change
        this.marcaService.update(marca.id!, marca).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marca actualizada' });
          this.loadMarcas();
          this.displayDialog = false;
          this.selectedImage =null
        });
      }
    }
  }
  

  hideDialog(): void {
    this.displayDialog = false;
  }

  deleteSelectedMarcas(): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar las marcas seleccionadas?',
      accept: () => {
        const deleteRequests = this.selectedMarcas.map(marca => this.marcaService.delete(marca.id!));
        Promise.all(deleteRequests).then(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Marcas eliminadas' });
          this.loadMarcas();
          this.selectedMarcas = [];
        });
      }
    });
  }
  confirm2(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
    });
}
}
