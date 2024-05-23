// src/app/models/tipo-combustible.ts
 interface TipoCombustible {
    id: number;
    nombre: string;
    descripcion: string;
    esElectrico: boolean;
    estado: 'activo' | 'inactivo';
  }
  
  export {TipoCombustible}