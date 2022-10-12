import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { CreateNewPostComponent } from '../create-new-post/create-new-post.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/user.service';

@Component({
  standalone: true,
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.scss'],
  imports: [
    SharedModule,
    CreateNewPostComponent
  ]
})
export class AdminPostComponent implements OnInit {

  constructor(
    private afs: Firestore,
    private us: UserService
  ) {

  }

  ngOnInit(): void {
  }

}
