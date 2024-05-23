interface Marca {
    id: number;
    nombre: string;
    descripcion: string;
    estado: 'activo' | 'inactivo';
    imagen: string; // Hacer que el campo imagen sea opcional
  }
  
  export { Marca };
  