import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

// Ejemplo Pipe
import { FormatoPipe } from '../components/formato.pipe';
import { MascotaCardComponent } from '../components/mascota-card/mascota-card.component';
import { LoginPageModule } from '../login/login.module';
import { StorageService } from '../services/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoginPageModule
  ],
  declarations: [HomePage, FormatoPipe, MascotaCardComponent],
  providers: [StorageService]
})
export class HomePageModule {}
