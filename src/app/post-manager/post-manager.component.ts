import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { PostFormComponent } from '../post-form/post-form.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/user.service';

@Component({
  standalone: true,
  selector: 'app-post-manager',
  templateUrl: './post-manager.component.html',
  styleUrls: ['./post-manager.component.scss'],
  imports: [
    PostFormComponent,
    SharedModule
  ]
})
export class PostManagerComponent implements OnInit {

  preview = false;
  post: any;

  constructor(
    private us: UserService,
    private afs: Firestore,
    private route: ActivatedRoute
  ) { }

  togglePreview() {
    this.preview = !this.preview;
  }

  async ngOnInit(): Promise<void> {
    const { slug } = this.route.snapshot.params;
    this.post = this.us.user
      ? await getDoc(
        doc(this.afs, 'users', this.us.user.uid, 'posts', slug)
      ).then(doc => doc.exists() ? doc.data() : null) : null;
    console.log(this.post);
  }
}
