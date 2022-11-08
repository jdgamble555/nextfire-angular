import { Injectable, OnDestroy } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  signOut,
  User
} from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { of, Subscription, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  private _username: string | null;
  private _user: User | null;
  private authSub: Subscription;

  constructor(
    private afa: Auth,
    private afs: Firestore
  ) {
    this._username = null;
    this._user = null;

    // get auth state
    this.authSub = authState(this.afa).pipe(
      switchMap(_user => {

        // set user
        this._user = _user;
        if (_user) {

          // if auth state, get username
          return docData(doc(this.afs, 'users', _user.uid))
            .pipe(
              tap(_doc => {
                console.log(_doc);
                this._username = _doc ? _doc['username'] : null;
              })
            );

        } else {

          // logged out
          this._username = null;
          return of(null);
        }

      })).subscribe();
  }

  get username(): string {
    return this._username as string;
  }

  get user(): User | null {
    return this._user;
  }

  signOut(): void {
    signOut(this.afa);
  }

  signInQuick() {
    signInAnonymously(this.afa);
  }

  signInWithGoogle() {
    signInWithPopup(this.afa, new GoogleAuthProvider());
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
