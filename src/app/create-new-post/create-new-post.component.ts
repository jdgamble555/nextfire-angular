import { Component, OnInit } from '@angular/core';
import { doc, Firestore, serverTimestamp, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/user.service';

@Component({
  standalone: true,
  selector: 'app-create-new-post',
  templateUrl: './create-new-post.component.html',
  styleUrls: ['./create-new-post.component.scss'],
  imports: [
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CreateNewPostComponent implements OnInit {

  kebabCase = (s: string) => {
    let x = s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);
    return x ? x.join('-').toLowerCase() : '';
  }

  newPostForm!: FormGroup;

  constructor(
    private us: UserService,
    private fb: FormBuilder,
    private afs: Firestore,
    private router: Router,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
    this.newPostForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]]
    });
  }

  async createPost() {

    const title = this.newPostForm.get('title')?.value;
    const slug = encodeURI(this.kebabCase(title));
    const uid = this.us.user?.uid;
    const username = this.us.username;
    if (slug && uid) {
      const ref = doc(this.afs, 'users', uid, 'posts', slug);

      // Tip: give all fields a default value here
      const data = {
        title,
        slug,
        uid,
        username,
        published: false,
        content: '# hello world!',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        heartCount: 0,
      };

      await setDoc(ref, data);

      this.toast.success('Post created!');

      // Imperative navigation after doc is set
      this.router.navigate([`/admin/${slug}`]);
    }
  }
}
