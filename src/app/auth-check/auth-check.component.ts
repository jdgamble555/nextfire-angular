import { Component, Input } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-auth-check',
  templateUrl: './auth-check.component.html',
  styleUrls: ['./auth-check.component.scss']
})
export class AuthCheckComponent {

  @Input() props: any;

  constructor(public us: UserService) { }

}
