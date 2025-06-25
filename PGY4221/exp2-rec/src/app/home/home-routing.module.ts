import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'nueva',
        loadChildren: () => import('../nueva/nueva.module').then(m => m.NuevaPageModule)
      },
      {
        path: 'nueva2',
        loadChildren: () => import('../nueva2/nueva2.module').then(m => m.Nueva2PageModule)
      },
      {
        path: 'nueva3',
        loadChildren: () => import('../nueva3/nueva3.module').then(m => m.Nueva3PageModule)
      },
      {
        path: '',
        redirectTo: '/home/nueva',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
