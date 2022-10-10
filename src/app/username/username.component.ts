import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {

  constructor(private route: ActivatedRoute) { 
    console.log(this.route.snapshot.data);
  }

  ngOnInit(): void {
  }

}
