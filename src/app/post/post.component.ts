import { Component } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  post: any;
  createdAt: Date | undefined;

  constructor(
    private route: ActivatedRoute,
    private afs: Firestore
  ) {
    const props = this.route.snapshot.data['props'];
    const postRef = doc(this.afs, props.path);
    const realtimePost = docData(postRef);

    this.post = realtimePost || props.post;
    this.createdAt = typeof this.post.createdAt === 'number' ? new Date(this.post.createdAt) : this.post.createdAt?.toDate();
  }
}
