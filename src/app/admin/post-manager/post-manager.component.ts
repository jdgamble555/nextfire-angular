import { Component, OnInit } from '@angular/core';
import { deleteDoc, doc, DocumentReference, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { PostFormComponent } from '../post-form/post-form.component';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../shared/user.service';
import { HotToastService } from '@ngneat/hot-toast';

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
  postRef!: DocumentReference;

  constructor(
    private us: UserService,
    private afs: Firestore,
    private route: ActivatedRoute,
    private router: Router,
    private toast: HotToastService
  ) { }

  togglePreview() {
    this.preview = !this.preview;
  }

  async ngOnInit(): Promise<void> {
    const { slug } = this.route.snapshot.params;
    if (this.us.user) {
      this.postRef = doc(this.afs, 'users', this.us.user.uid, 'posts', slug);
      this.post = await getDoc(this.postRef)
        .then(doc => doc.exists() ? { ...doc.data(), id: doc.id } : null);
    }
  }

  async deletePost() {
    const doIt = confirm('are you sure!');
    if (doIt) {
      await deleteDoc(this.postRef);
      this.router.navigate(['admin']);
      this.toast.show('post annihilated ', { icon: '🗑️' });
    }
  }
}
