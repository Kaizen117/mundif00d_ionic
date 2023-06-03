import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoverpagePage } from './coverpage.page';

const routes: Routes = [
  {
    path: '',
    component: CoverpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoverpagePageRoutingModule {}
