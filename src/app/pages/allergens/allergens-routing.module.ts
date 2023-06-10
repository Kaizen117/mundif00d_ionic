import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllergensPage } from './allergens.page';

const routes: Routes = [
  {
    path: '',
    component: AllergensPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllergensPageRoutingModule {}
