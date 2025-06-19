import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Nueva2PageRoutingModule } from './nueva2-routing.module';

import { Nueva2Page } from './nueva2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Nueva2PageRoutingModule
  ],
  declarations: [Nueva2Page]
})
export class Nueva2PageModule {}
