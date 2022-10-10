import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsernameRoutingModule } from './username-routing.module';
import { UsernameComponent } from './username.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UsernameComponent
  ],
  imports: [
    CommonModule,
    UsernameRoutingModule,
    SharedModule
  ]
})
export class UsernameModule { }
