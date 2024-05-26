import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { EmpleadoService } from '../services/empleado.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private empleadoService: EmpleadoService
    ) { }

    async ngOnInit() {
        // Verificar si el usuario es administrador
        const esAdmin =  this.empleadoService.isAdmin();

        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'UI Components',
                items: [
                    { label: 'Marcas', icon: 'pi pi-fw pi-tags', routerLink: ['/empleado/marcas'] },
                    { label: 'Tipos de vehículos', icon: 'pi pi-fw pi-table', routerLink: ['/empleado/tiposVehiculos'] },
                    { label: 'Tipos de combustibles', icon: 'pi pi-fw pi-truck', routerLink: ['/empleado/tiposCombustible'] },
                    { label: 'Modelos', icon: 'pi pi-fw pi-cog', routerLink: ['/empleado/modelos'] },
                    { label: 'Vehículos', icon: 'pi pi-fw pi-car', routerLink: ['empleado/vehiculos'] },
                    { label: 'Inspecciones', icon: 'pi pi-fw pi-search-plus', routerLink: ['/empleado/inspecciones'] },
                    { label: 'Clientes', icon: 'pi pi-fw pi-user-plus', routerLink: ['/empleado/cliente'] },
                    { label: 'Renta y devolución', icon: 'pi pi-fw pi-share-alt', routerLink: ['/empleado/rentaDevolucion'] }
                ]
            }
        ];

        // Si el usuario es administrador, agregar el ítem de Empleados
        if (esAdmin) {
            this.model[1].items.push(
                { label: 'Empleados', icon: 'pi pi-fw pi-users', routerLink: ['/empleado/empleados'] }
            );
        }
    }
}
