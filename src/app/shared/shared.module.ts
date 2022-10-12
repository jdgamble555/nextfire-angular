import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { PostFeedComponent } from '../post-feed/post-feed.component';
import { RouterModule } from '@angular/router';
import { AuthCheckComponent } from '../auth-check/auth-check.component';

const modules = [
  CommonModule,
  RouterModule
];

const components = [
  LoaderComponent,
  PostFeedComponent,
  AuthCheckComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule { }
