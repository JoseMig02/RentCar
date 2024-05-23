// interfaces/IVehiculo.ts

interface Vehiculo {
    id: number; // opcional ya que puede no estar presente al crear un nuevo vehiculo
    nombre: string;
    descripcion: string;
    noChasis: string;
    noMotor: string;
    noPlaca: string;
    estado: 'disponible' | 'alquilado' | 'mantenimiento';
    color: string;
    anoFabricacion?: number;
    kilometraje?: number;
    imagenes: string[]; // Se cambia a un array para permitir múltiples imágenes
    idTipoVehiculo: number;
    idMarca: number;
    idModelo: number;
    idTipoCombustible: number;
  }
  
  export {
    Vehiculo
  }