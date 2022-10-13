import { Component, Input, OnInit } from '@angular/core';
import { doc, Firestore, serverTimestamp, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { MarkdownModule } from 'ngx-markdown';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/user.service';

@Component({
  standalone: true,
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MarkdownModule,
    ImageUploaderComponent
  ]
})
export class PostFormComponent implements OnInit {

  postForm!: FormGroup;

  @Input() preview!: boolean;
  @Input() post!: any;

  constructor(
    private fb: FormBuilder,
    private toast: HotToastService,
    private afs: Firestore,
    private us: UserService
  ) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      content: [this.post.content, [
        Validators.required,
        Validators.maxLength(20000),
        Validators.minLength(10)
      ]],
      published: [this.post.published, [
        Validators.required
      ]]
    });
  }

  get content() {
    return this.postForm.get('content');
  }

  get published() {
    return this.postForm.get('published');
  }

  async updatePost() {
    const content = this.content?.value;
    const published = this.published?.value;
    const uid = this.us.user?.uid;
    if (uid) {
      const postRef = doc(this.afs, 'users', uid, 'posts', this.post.id)
      await updateDoc(postRef, {
        content,
        published,
        updatedAt: serverTimestamp(),
      });
      this.toast.success('Post updated successfully!');
    }
  };
}
