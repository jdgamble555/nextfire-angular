import { Component, Input, OnInit } from '@angular/core';
import { SeoService } from '../shared/seo.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() user: any;

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.generateTags({
      title: this.user.username,
      description: this.user.username + "'s public profile"
    });
  }
}
