import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AppLoadingComponent } from './app-loading/app-loading.component';

@NgModule({
  declarations: [FooterComponent, AppLoadingComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule,
    FormsModule
  ],
  exports: [
    FooterComponent, AppLoadingComponent, CommonModule
  ]
})
export class ComponentsModule { }
