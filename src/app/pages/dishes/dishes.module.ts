import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DishesPageRoutingModule } from './dishes-routing.module';

import { DishesPage } from './dishes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DishesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DishesPage]
})
export class DishesPageModule {}
