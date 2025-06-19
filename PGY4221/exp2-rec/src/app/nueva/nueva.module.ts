import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaPageRoutingModule } from './nueva-routing.module';

import { NuevaPage } from './nueva.page';
import { StorageService } from '../services/storage.service';
import { Storage } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaPageRoutingModule
  ],
  declarations: [NuevaPage],
  providers: [StorageService, Storage]
})
export class NuevaPageModule {}
