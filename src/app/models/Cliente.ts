export interface Cliente {
    id?: number;
    nombre: string;
    cedula: string;
    correo: string;
    contrasena?: string;
    noTarjetaCR: string;
    limiteCredito: number;
    tipoPersona: 'Física' | 'Jurídica';
    estado?: 'activo' | 'inactivo';
    role?: 'cliente';
  }
  