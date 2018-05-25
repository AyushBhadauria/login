import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetComponent } from './reset.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

const routes: Routes = [
    {
        path: '',
        component: ResetComponent
    }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ResetComponent,],
  providers:[AuthService]
})
export class ResetModule { }
