import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Nueva2Page } from './nueva2.page';

const routes: Routes = [
  {
    path: '',
    component: Nueva2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Nueva2PageRoutingModule {}
