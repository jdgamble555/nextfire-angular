import { Component, OnInit } from '@angular/core';
import {
  collectionGroup,
  Firestore,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../shared/loader.service';

const LIMIT = 10;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts!: any;

  postsEnd = false;

  constructor(
    public ls: LoaderService,
    private route: ActivatedRoute,
    private afs: Firestore
  ) { }

  ngOnInit(): void {
    const { posts } = this.route.snapshot.data['props'];
    this.posts = posts;
  }

  async getMorePosts() {
    if (this.posts) {
      this.ls.loading = true;
      const last = this.posts[this.posts.length - 1];

      const cursor = typeof last.createdAt === 'number' ? Timestamp.fromMillis(last.createdAt) : last.createdAt;

      const ref = collectionGroup(this.afs, 'posts');
      const postsQuery = query(
        ref,
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        startAfter(cursor),
        limit(LIMIT),
      )

      const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

      this.posts = this.posts.concat(newPosts);
      this.ls.loading = false;

      if (newPosts.length < LIMIT) {
        this.postsEnd = true;
      }
    }
  }
}
