import { Injectable, OnDestroy } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { of, Subscription, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  private _username: string;
  private _user: User | null;
  private authSub: Subscription;

  constructor(
    private afa: Auth,
    private afs: Firestore
  ) {
    this._username = '';
    this._user = null;

    // get auth state
    this.authSub = authState(this.afa).pipe(
      switchMap(_user => {
        if (_user) {
          this._user = _user;

          // if auth state, get username
          return docData(doc(this.afs, 'users', this._user.uid))
            .pipe(
              tap(_doc => {
                this._username = _doc['username']
              })
            );
        }
        return of(null);
      })).subscribe();
  }

  get username(): string {
    return this._username;
  }

  get user(): User | null {
    return this._user;
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
