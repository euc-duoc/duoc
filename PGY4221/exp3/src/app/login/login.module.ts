import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

// Componentes específicos
import { LoginFormComponent } from '../components/login-form/login-form.component';
import { StorageService } from '../services/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, LoginFormComponent],
  exports: [LoginFormComponent],
  providers: [StorageService]
})
export class LoginPageModule {}
