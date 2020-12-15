import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    FlexModule
  ]
})
export class ProfileModule {
}
