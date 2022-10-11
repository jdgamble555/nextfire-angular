import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { PostFeedComponent } from '../post-feed/post-feed.component';
import { RouterModule } from '@angular/router';

const modules = [
  CommonModule,
  RouterModule
];

const components = [
  LoaderComponent,
  PostFeedComponent
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
