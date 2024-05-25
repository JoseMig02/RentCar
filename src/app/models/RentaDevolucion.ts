
 interface RentaDevolucion {
  id:number
  noRenta: number;
  fechaRenta: Date;
  fechaDevolucion: Date;
  montoXDia: number;
  cantidadDias: number;
  comentario?: string;
  estado: 'renta' | 'devolucion';
  totalPago: number;
  estadoPago: 'pendiente' | 'pagado';
  idEmpleado: number;
  idVehiculo: number;
  idCliente: number;
}


export{
    RentaDevolucion
}