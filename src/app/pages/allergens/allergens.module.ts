import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllergensPageRoutingModule } from './allergens-routing.module';

import { AllergensPage } from './allergens.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllergensPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AllergensPage]
})
export class AllergensPageModule {}
