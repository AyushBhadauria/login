import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: ForgotPasswordComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
 FormsModule
  ],
  declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
