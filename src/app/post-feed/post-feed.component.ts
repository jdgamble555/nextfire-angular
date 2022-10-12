import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss']
})
export class PostFeedComponent implements OnInit {

  @Input() posts!: any;
  private _admin: boolean = false;

  @Input()
  get admin(): boolean {
    return this._admin;
  }
  set admin(value: BooleanInput) {
    this._admin = coerceBooleanProperty(value);
  }

  ngOnInit(): void {
    this.posts = this.posts ? this.posts.map((post: any) => {

      // Naive method to calc word count and read time
      const wordCount = post?.content.trim().split(/\s+/g).length;
      const minutesToRead = (wordCount / 100 + 1).toFixed(0);

      return { ...post, wordCount, minutesToRead, admin: this.admin };
    }) : null;
  }

}
