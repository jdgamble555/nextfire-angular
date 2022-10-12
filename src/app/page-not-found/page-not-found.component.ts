import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  imports: [SharedModule]
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
