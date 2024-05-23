import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../../services/empleado.service';
import { MessageService } from 'primeng/api';

interface TandaLabor {
  label: string;
  value: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  tandasLabor: TandaLabor[] = [];

  signupForm!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      cedula: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      tandaLabor: ['', Validators.required],
      porcentajeComision: ['', Validators.required],
      fechaIngreso: ['', Validators.required],
    });

    this.tandasLabor = [
      { label: 'Matutina', value: 'Matutina' },
      { label: 'Vespertina', value: 'Vespertina' },
      { label: 'Nocturna', value: 'Nocturna' }
    ];
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos Obligatorios faltantes', life: 2000 });
      return;
    }

    this.loading = true;
    this.empleadoService.signup(this.signupForm.value).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro exitoso', life: 2000 });
        this.loading = false;
        this.signupForm.reset();  // Limpiar el formulario
        this.signupForm.markAsPristine();  // Reiniciar estado de los controles
        this.signupForm.markAsUntouched();  // Reiniciar estado de los controles
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar', life: 2000 });
        console.error('Error al registrar:', error);
        this.loading = false;
      }
    });
  }
}
