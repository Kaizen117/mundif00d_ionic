import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule,
    FormsModule
  ],
  exports: [
    FooterComponent, CommonModule
  ]
})
export class ComponentsModule { }
