import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Nueva3PageRoutingModule } from './nueva3-routing.module';

import { Nueva3Page } from './nueva3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Nueva3PageRoutingModule
  ],
  declarations: [Nueva3Page]
})
export class Nueva3PageModule {}
