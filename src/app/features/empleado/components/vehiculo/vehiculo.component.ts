import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculoService } from '../../../../services/vehiculos.service';
import { Vehiculo } from '../../../../models/Vehiculo';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Marca } from '../../../../models/Marca';
import { MarcaService } from '../../../../services/marca.service';
import { Modelo } from '../../../../models/Modelo';
import { ModeloService } from '../../../../services/modelo.service';
import { TipoCombustible } from '../../../../models/TipoCombustible';
import { TipoVehiculoService } from '../../../../services/tipo-vehiculo.service';
import { TipoCombustibleService } from '../../../../services/tipoCombustible.service';
import { TipoVehiculo } from '../../../../models/TipoVehiculo';
import { Observable, map } from 'rxjs';
import { FileUpload } from 'primeng/fileupload';
import { error } from 'console';

interface Estado {
  label: string;
  value: string;
}
interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload!: FileUpload; // Agrega ViewChild
  Vehiculos: Vehiculo[] = [];
  tipoCombustible: TipoCombustible[] = [];
  marcas: Marca[] = [];
  modelos: Modelo[] = [];
  tipoVehiculos: TipoVehiculo[] = [];
  displayDialog: boolean = false;
  VehiculoForm!: FormGroup;
  isNew: boolean = false;
  selectedVehiculos: Vehiculo[] = [];
  estados: Estado[] | undefined;
  selectedImages: File[] = [];
  selectedMarca: Marca | undefined;
  marcasMap: { [id: number]: string } = {};
  uploadedFiles: any[] = [];
  selectedImage: any;

  constructor(
    private fb: FormBuilder,
    private vehiculoService: VehiculoService,
    private tipoVehiculoService: TipoVehiculoService,
    private tipoCombustibleService: TipoCombustibleService,
    private modeloservice: ModeloService,
    private marcaService: MarcaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.VehiculoForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      noChasis: ['', Validators.required],
      noMotor: ['', Validators.required],
      noPlaca: ['', Validators.required],
      estado: ['', Validators.required],
      color: ['', Validators.required],
      anoFabricacion: [''],
      kilometraje: [''],
      imagenes: [],
      idTipoVehiculo: ['', Validators.required],
      idMarca: ['', Validators.required],
      idModelo: ['', Validators.required],
      idTipoCombustible: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadVehiculos();
    this.loadTipoVehiculos();
    this.loadMarcas();
    this.loadModelos();
    this.loadTipoCombustible();
    this.estados = [
      { label: 'Disponible', value: 'disponible' },
      { label: 'Alquilado', value: 'alquilado' },
      { label: 'Mantenimiento', value: 'mantenimiento' }
    ];
  }



  loadVehiculos(): void {
    this.vehiculoService.getAll().subscribe((data: Vehiculo[]) => {
      this.Vehiculos = data;

    },
  error =>{
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener vehiculos' });
  });
  }

  loadTipoVehiculos(): void {
    this.tipoVehiculoService.getAll().subscribe((data: TipoVehiculo[]) => {
      this.tipoVehiculos = data.filter(tipoVehiculo => tipoVehiculo.estado === 'activo');

    });
  }

  loadMarcas(): void {
    this.marcaService.getAll().subscribe((data: Marca[]) => {
      this.marcas = data.filter(marca => marca.estado === 'activo');
      this.marcas.forEach(marca => {
        this.marcasMap[marca.id] = marca.nombre;
      });
    });
  }

  loadModelos(): void {
    this.modeloservice.getAll().subscribe((data: Modelo[]) => {
      this.modelos = data.filter(modelo => modelo.estado === 'activo');
    });
  }

  loadTipoCombustible() {
    this.tipoCombustibleService.getAll().subscribe((data: TipoCombustible[]) => {
      this.tipoCombustible = data.filter(tipoCombustible => tipoCombustible.estado === 'activo');
    });
  }

  openNew(): void {
    this.isNew = true;
    this.VehiculoForm.reset();
    this.VehiculoForm.patchValue({ estado: 'activo' });
    this.displayDialog = true;

  }

  editVehiculo(vehiculo: Vehiculo): void {
    this.isNew = false;
    this.VehiculoForm.patchValue(vehiculo);
    this.displayDialog = true;

  }

  deleteVehiculo(id: number): void {
    console.log(id);
    this.confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este Vehiculo?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.vehiculoService.delete(id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Vehiculo eliminado' });
          this.loadVehiculos();
        });
      }
    });
  }
  saveVehiculo(): void {
    if (this.VehiculoForm.invalid) {
      this.VehiculoForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completar Campos', life: 2000 });
      return;
    }

    const vehiculo = this.VehiculoForm.value as Vehiculo;

    if (this.isNew) {
      this.vehiculoService.create(vehiculo).subscribe(createdVehiculo => {
        this.loadVehiculos();
        console.log('sin imagen creado');
        this.selectedImage =null
        if (this.selectedImage) {
          this.vehiculoService.uploadImages(createdVehiculo.id, this.selectedImage).subscribe(() => {
            console.log('creado todo')
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Vehículo creado' });
            this.loadVehiculos();
            this.displayDialog = false;
            this.fileUpload.clear(); // Limpiar el componente FileUpload después de la creación
            this.selectedImage =null
          });
        } else {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Vehículo creado sin imagen' });
          console.log('no te ejecutas')
          this.loadVehiculos();
          this.displayDialog = false;
          this.fileUpload.clear(); // Limpiar el componente FileUpload después de la creación
        }
      });
    } else { // Update scenario
      if (this.selectedImage) {
        // Upload image first, then update vehiculo
        this.vehiculoService.uploadImages(vehiculo.id, this.selectedImage).subscribe(() => {
          this.vehiculoService.update(vehiculo.id!, vehiculo).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Vehículo actualizado' });
            this.loadVehiculos();
            this.displayDialog = false;
            this.fileUpload.clear(); // Limpiar el componente FileUpload después de la actualización
            this.selectedImage =null
          });
        });
      } else {
        // Update vehiculo without image change
        this.vehiculoService.update(vehiculo.id!, vehiculo).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Vehículo actualizado' });
          this.loadVehiculos();
          this.displayDialog = false;
          this.fileUpload.clear(); // Limpiar el componente FileUpload después de la actualización
          this.selectedImage =null
        });
      }
    }
  }


  hideDialog(): void {
    this.displayDialog = false;

  }

  onImageSelect(event: any) {
    this.selectedImage = event.files[0];
  }
}
