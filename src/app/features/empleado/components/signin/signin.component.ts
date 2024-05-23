import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../../services/empleado.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Empleado } from '../../../../models/Empleado';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [MessageService]
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private empleadoService : EmpleadoService ,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signinForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    
    });
  }

  onSubmit() {
    if (this.signinForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Campos Obligatorios faltantes', life: 2000 });
      return;
    }
    const empleado:Empleado = this.signinForm.value

    this.loading = true;
    this.empleadoService.signin(empleado).subscribe({
      next: (token:any) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Inicio de sesión exitoso', life: 4000 });
        this.loading = false;
        console.log(token)
        localStorage.setItem('token', token.token);
        this.router.navigate(['/']);
        console.log(this.signinForm.value)
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 2000 });
        console.error('Error al iniciar sesión:', error);
        console.log(this.signinForm.value)
        this.loading = false;
      }
    });
  }
}
