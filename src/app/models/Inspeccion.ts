 interface Inspeccion {
  id: number;
  tieneRalladuras: boolean;
  cantidadCombustible: '1/4' | '1/2' | '3/4' | 'lleno';
  tieneGomaRespuesta: boolean;
  tieneGato: boolean;
  tieneRoturasCristal: boolean;
  estadoGomas: string;
  lucesFuncionando: boolean;
  liquidoFrenos: 'bajo' | 'medio' | 'alto';
  presionNeumaticos: 'baja' | 'normal' | 'alta';
  nivelAceite: 'bajo' | 'medio' | 'alto';
  observaciones: string;
  fecha: Date;
  estado: 'activo' | 'inactivo';
  idVehiculo: number;
  idCliente: number;
  idEmpleadoInspeccion: number;
}

export {Inspeccion}
