import { Component, OnDestroy } from '@angular/core';
import { doc, docData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeoService } from '../shared/seo.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnDestroy {

  post: any;
  createdAt: Date | undefined;
  postSub: Subscription;
  postRef: DocumentReference;

  constructor(
    private route: ActivatedRoute,
    private afs: Firestore,
    public us: UserService,
    private seo: SeoService
  ) {

    this.seo.generateTags({
      title: "Enter",
      description: "Sign up for this amazing app!"
    });

    const props = this.route.snapshot.data['props'];
    this.postRef = doc(this.afs, props.path);
    this.post = props.post;
    this.postSub = docData(this.postRef).subscribe((post) => post ? (this.post = post) : null);

    this.post = props.post;
    this.createdAt = typeof this.post.createdAt === 'number' ? new Date(this.post.createdAt) : this.post.createdAt?.toDate();
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
