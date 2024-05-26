import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

  items!: MenuItem[];

  profileDialogVisible: boolean = false;

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService, private router: Router) { }

  showProfileDialog() {
    this.profileDialogVisible = true;
  }

  closeProfileDialog() {
    this.profileDialogVisible = false;
  }

  logout() {

    localStorage.removeItem('authToken');
    localStorage.removeItem('employeeId');
    this.profileDialogVisible = false;
    this.router.navigate(['/empleado/signIn']); // Redirigir a la página de inicio de sesión
  }
}
