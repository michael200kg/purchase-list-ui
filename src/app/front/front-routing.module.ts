import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontComponent } from './front/front.component';

const routes: Routes = [
  {
    component: FrontComponent,
    path: 'purchases',
    loadChildren: () => import('../@purchases/purchases.module').then(m => m.PurchasesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule {
}
