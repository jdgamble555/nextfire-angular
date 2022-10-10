import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc, writeBatch } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { switchMap, timer } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  standalone: true,
  selector: 'app-username-form',
  templateUrl: './username-form.component.html',
  styleUrls: ['./username-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UsernameFormComponent implements OnInit {

  usernameForm!: FormGroup;

  constructor(
    private afs: Firestore,
    private fb: FormBuilder,
    private us: UserService,
    public ls: LoaderService
  ) { }

  ngOnInit(): void {
    this.usernameForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern(/^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
      ], this.checkUsername()]
    })
  }

  get username() {
    return this.usernameForm.get('username')!.value;
  }

  async onSubmit() {

    const { user } = this.us;
    const username = (this.usernameForm.value.username as string).toLowerCase();

    if (user && username) {

      // Create refs for both documents
      const userDoc = doc(this.afs, 'users', user.uid);
      const usernameDoc = doc(this.afs, 'usernames', username);

      // Commit both docs together as a batch write.
      const batch = writeBatch(this.afs);
      batch.set(userDoc, { username, photoURL: user.photoURL, displayName: user.displayName });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
    }
  }

  checkUsername(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any; } | null => {
      const username = (control.value as string).toLowerCase();
      return timer(500).pipe(
        switchMap(async () => {
          try {
            this.ls.loading = true;
            const ref = doc(this.afs, 'usernames', username);
            const snap = await getDoc(ref);
            console.log('Firestore read executed!', snap.exists());
            this.ls.loading = false;
            return snap.exists() ? { 'unavailable': true } : null;
          } catch (e: any) {
            console.error(e);
            return null;
          }
        })
      );
    }
  }
}