import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoverpagePageRoutingModule } from './coverpage-routing.module';

import { CoverpagePage } from './coverpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoverpagePageRoutingModule
  ],
  declarations: [CoverpagePage]
})
export class CoverpagePageModule {}
