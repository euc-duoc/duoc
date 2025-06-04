import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascotaDetallePageRoutingModule } from './mascota-detalle-routing.module';

import { MascotaDetallePage } from './mascota-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MascotaDetallePageRoutingModule
  ],
  declarations: [MascotaDetallePage]
})
export class MascotaDetallePageModule {}
