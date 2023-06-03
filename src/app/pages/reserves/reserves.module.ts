import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservesPageRoutingModule } from './reserves-routing.module';

import { ReservesPage } from './reserves.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReservesPage]
})
export class ReservesPageModule {}
