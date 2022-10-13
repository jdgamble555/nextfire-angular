import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MarkdownModule
  ]
})
export class PostFormComponent implements OnInit {

  postForm!: FormGroup;

  @Input() preview!: boolean;
  @Input() post!: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      content: [this.post.content, [
        Validators.required
      ]]
    });
    console.log(this.post)
  }

  updatePost() {

  }

}
