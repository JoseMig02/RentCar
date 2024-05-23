 interface Modelo {
    id: number;
    nombre: string;
    descripcion: string;
    ano: number;
    estado: 'activo' | 'inactivo';
    imagen: string;
    idMarca: number; // Asegúrate de incluir esta propiedad si necesitas la relación con la marca
  }
export{Modelo}  