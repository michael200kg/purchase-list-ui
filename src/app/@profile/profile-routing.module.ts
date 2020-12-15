import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';

const profileRoutes: Routes = [

  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: '**',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
