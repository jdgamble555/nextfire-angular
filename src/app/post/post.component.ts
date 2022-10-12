import { Component, OnDestroy } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnDestroy {

  post: any;
  createdAt: Date | undefined;
  postSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private afs: Firestore
  ) {
    const props = this.route.snapshot.data['props'];
    const postRef = doc(this.afs, props.path);
    let realtimePost;
    this.postSub = docData(postRef).subscribe((post) => post ? (realtimePost = post) : null);

    this.post = props.post;
    this.createdAt = typeof this.post.createdAt === 'number' ? new Date(this.post.createdAt) : this.post.createdAt?.toDate();
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
