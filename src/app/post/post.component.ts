import { Component, OnDestroy } from '@angular/core';
import { doc, docData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import { Subscription } from 'rxjs';
import { SeoService } from '../shared/seo.service';
import { StateService } from '../shared/state/state.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnDestroy {

  post: any;
  createdAt: Date | undefined;
  postSub!: Subscription;
  postRef: DocumentReference;

  constructor(
    private route: ActivatedRoute,
    private afs: Firestore,
    public us: UserService,
    private seo: SeoService,
    private md: MarkdownService,
    private state: StateService
  ) {

    this.seo.generateTags({
      title: "Enter",
      description: "Sign up for this amazing app!"
    });

    // markdown does not parse on SSR --bug?--, so just load in frontend subscription
    // note - we still get valid metatags for SSR

    const props = this.route.snapshot.data['props'];
    this.postRef = doc(this.afs, props.path);
    if (this.state.isBrowser) {
      this.post = this.postConvert(props.post);
      this.postSub = docData(this.postRef).subscribe((post) => post ? (this.post = this.postConvert(post)) : null);
    }
  }

  postConvert(p: any) {
    return ({
      ...p,
      createdAt: typeof p.createdAt === 'number' ? new Date(p.createdAt) : p.createdAt?.toDate(),
      content: this.md.parse(p['content'])
    });
  }

  ngOnDestroy(): void {
    if (this.state.isBrowser) this.postSub.unsubscribe();
  }
}
