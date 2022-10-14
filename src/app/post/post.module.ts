import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PostRoutingModule,
    MarkdownModule.forChild()
  ]
})
export class PostModule { }
