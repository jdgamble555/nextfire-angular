import { Component } from '@angular/core';
import { CreateNewPostComponent } from '../create-new-post/create-new-post.component';
import { PostManagerComponent } from '../post-manager/post-manager.component';
import { SharedModule } from '../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.scss'],
  imports: [
    SharedModule,
    PostManagerComponent,
    CreateNewPostComponent
  ]
})
export class AdminPostComponent { }
