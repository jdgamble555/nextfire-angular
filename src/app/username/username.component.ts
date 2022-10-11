import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent {

  posts: any;
  user: any;

  constructor(private route: ActivatedRoute) {
    const { posts, user } = this.route.snapshot.data['props'];
    this.posts = posts;
    this.user = user;
  }
}
