
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, enableProdMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

// Import your components here
import { AppLayoutComponent } from './layout/app.layout.component';
import { AppTopBarComponent } from './layout/app.topbar.component';
import { AppSidebarComponent } from './layout/app.sidebar.component';
import { AppFooterComponent } from './layout/app.footer.component';
import { AppConfigComponent } from './layout/config/app.config.component';
import { AppMenuComponent } from './layout/app.menu.component';
import { AppMenuitemComponent } from './layout/app.menuitem.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { EmpleadoModule } from './features/empleado/empleado/empleado.module';
import { NofoundComponent } from './shared/components/nofound/nofound.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import {isPlatformBrowser } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './enviroment/environment';
import { ToastModule } from 'primeng/toast';
import { AccessComponent } from './shared/components/access/access.component';


@NgModule({
  declarations: [
    AppComponent,
    NofoundComponent,
    AccessComponent,








  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    AppRoutingModule,
    AppLayoutModule,
    EmpleadoModule,
  ToastModule



  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],

})


export class AppModule { }
