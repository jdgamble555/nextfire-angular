import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/user.service';
import { UsernameFormComponent } from './username-form/username-form.component';

@Component({
  standalone: true,
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss'],
  imports: [
    UsernameFormComponent, 
    SharedModule
  ]
})
export class EnterComponent {

  constructor(
    public us: UserService
  ) { }

}
