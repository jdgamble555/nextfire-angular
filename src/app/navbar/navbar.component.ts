import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    public us: UserService,
    public afa: Auth
  ) { }

}
