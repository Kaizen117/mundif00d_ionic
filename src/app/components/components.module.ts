import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AppLoadingComponent } from './app-loading/app-loading.component';
import { DishesComponent } from './dishes/dishes.component';
import { NamePipe } from '../pipes/descriptionName.pipe';

@NgModule({
  declarations: [FooterComponent, DishesComponent, AppLoadingComponent, NamePipe],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule,
    FormsModule
  ],
  exports: [
    FooterComponent, DishesComponent, AppLoadingComponent, CommonModule, NamePipe
  ]
})
export class ComponentsModule { }
