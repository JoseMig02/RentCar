// src/app/models/tipoVehiculo.model.ts
export interface TipoVehiculo {
    id?: number;
    nombre: string;
    descripcion: string;
    estado: 'activo' | 'inactivo';
  }
  