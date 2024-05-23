interface Empleado {
    id: number;
    nombre: string;
    cedula: string;
    correo: string;
    contrasena: string;
    tandaLabor: 'Matutina' | 'Vespertina' | 'Nocturna';
    porcentajeComision: number;
    fechaIngreso: Date;
    estado: 'activo' | 'inactivo';
    role: 'empleado' | 'admin' | 'pendiente';
  }
  
  interface Empleadologin {
    
    correo: string;
    contrasena: string;
  
  }
  
  export { Empleado, Empleadologin };
  