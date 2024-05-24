export interface Cliente {
    id?: number;
    nombre: string;
    cedula: string;
    noTarjetaCR: string;
    limiteCredito: number;
    tipoPersona: 'Física' | 'Jurídica';
    estado?: 'activo' | 'inactivo';
  
  }
  