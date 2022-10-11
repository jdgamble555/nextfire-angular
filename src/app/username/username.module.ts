import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsernameRoutingModule } from './username-routing.module';
import { UsernameComponent } from './username.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    UsernameComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UsernameRoutingModule,
    SharedModule,
    MarkdownModule.forChild()
  ]
})
export class UsernameModule { }
