import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/user.service';

@Component({
  standalone: true,
  selector: 'app-admin-post',
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.scss'],
  imports: [SharedModule]
})
export class AdminPostComponent implements OnInit {

  posts: any;

  constructor(
    private afs: Firestore,
    private us: UserService
    ) { 
    /*const ref = collection(this.afs, 'users', this.us.user.uid, 'posts')
    const postQuery = query(ref, orderBy('createdAt'))
  
    this.posts = collectionData(postQuery);*/
  

  }

  ngOnInit(): void {
  }

}
