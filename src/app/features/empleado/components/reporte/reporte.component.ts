import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ReporteService } from '../../../../services/reporte.service';
import { TipoVehiculoService } from '../../../../services/tipo-vehiculo.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  providers: [MessageService]
})
export class ReporteComponent implements OnInit {
  reporteForm: FormGroup;
  tiposReporte = [
    { label: 'Reporte entre Fechas', value: 'fechas' },
    { label: 'Reporte por Tipo de Vehículo', value: 'tipoVehiculo' }
  ];
  tiposVehiculo: any[] = [];

  constructor(
    private fb: FormBuilder,
    private reporteService: ReporteService,
    private tipoVehiculoService: TipoVehiculoService,
    private messageService: MessageService
  ) {
    this.reporteForm = this.fb.group({
      tipoReporte: ['', Validators.required],
      fechaInicio: ['',],
      fechaFin: [''],
      idTipoVehiculo: ['',]
    });
  }

  ngOnInit() {
    this.tipoVehiculoService.getAll().subscribe((data: any) => {
      this.tiposVehiculo = data.map((tipo: any) => ({ label: tipo.nombre, value: tipo.id }));
    });

    this.reporteForm.get('tipoReporte')?.valueChanges.subscribe(value => {
      this.resetValidation();
    });
  }

  validateFechas(control: AbstractControl) {
    const parent = control.parent;
    if (parent) {
      const tipoReporte = parent.get('tipoReporte')?.value;
      const fechaInicio = parent.get('fechaInicio')?.value;
      const fechaFin = parent.get('fechaFin')?.value;

      if (tipoReporte === 'fechas' && (!fechaInicio || !fechaFin)) {
        return { required: true };
      }
    }
    return null;
  }

  resetValidation() {
    this.reporteForm.get('fechaInicio')?.updateValueAndValidity();
    this.reporteForm.get('fechaFin')?.updateValueAndValidity();
  }

  formatFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  generarReporte() {
    if (this.reporteForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete todos los campos obligatorios.' });
      return;
    } 
 

    let { tipoReporte, fechaInicio, fechaFin, idTipoVehiculo } = this.reporteForm.value;

    if (tipoReporte === 'tipoVehiculo'){
      if (!idTipoVehiculo) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Seleccione el tipo de vehiculo.' });
        return;
      }
     
    }else if(tipoReporte ==='fechas'){
      if(!fechaInicio || !fechaFin ){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Complete ambas fechas' });
        return;
      }
    }

    if (fechaInicio) {
      fechaInicio = this.formatFecha(new Date(fechaInicio));
    }

    if (fechaFin) {
      fechaFin = this.formatFecha(new Date(fechaFin));
    }

    if (tipoReporte === 'fechas') {
      this.reporteService.generarReporteEntreFechas(fechaInicio, fechaFin).subscribe((data: Blob) => {
        this.descargarArchivo(data, 'reporte_rentas_entre_fechas.pdf');
      }, error => {
        console.error('Error al generar el reporte entre fechas:', error);
      });
    } else if (tipoReporte === 'tipoVehiculo') {
      this.reporteService.generarReportePorTipoVehiculo(idTipoVehiculo).subscribe((data: Blob) => {
        this.descargarArchivo(data, 'reporte_rentas_por_tipo_vehiculo.pdf');
      }, error => {
        console.error('Error al generar el reporte por tipo de vehículo:', error);
      });
    }
  }

  descargarArchivo(data: Blob, nombreArchivo: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  limpiarFiltros() {
    this.reporteForm.reset();
    this.reporteForm.get('tipoReporte')?.setValue('');
  }
}
