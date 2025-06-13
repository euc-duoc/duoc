import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MascotaDetallePage } from './mascota-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: MascotaDetallePage
  },
  {
    path: ':id',
    component: MascotaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MascotaDetallePageRoutingModule {}
