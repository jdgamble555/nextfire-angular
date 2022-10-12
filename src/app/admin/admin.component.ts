import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { CreateNewPostComponent } from '../create-new-post/create-new-post.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/user.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [
    SharedModule,
    CreateNewPostComponent
  ]
})
export class AdminComponent {

  posts: any;

  constructor(
    private us: UserService,
    private afs: Firestore
  ) {
    this.posts = this.us.user
      ? collectionData(
        query(
          collection(this.afs, 'users', this.us.user.uid, 'posts'),
          orderBy('createdAt')
        )
      ) : of(null);
  }

}
