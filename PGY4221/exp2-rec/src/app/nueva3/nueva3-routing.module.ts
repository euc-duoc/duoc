import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Nueva3Page } from './nueva3.page';

const routes: Routes = [
  {
    path: '',
    component: Nueva3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Nueva3PageRoutingModule {}
