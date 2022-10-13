import { Injectable } from '@angular/core';
import {
  collectionGroup,
  Firestore,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from '@angular/fire/firestore';
import { Resolve } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { StateService } from '../shared/state/state.service';

// Max post to query per page
const LIMIT = 10;

@Injectable({
  providedIn: 'root'
})
export class HomeResolver implements Resolve<any> {

  constructor(
    private ss: StateService,
    private fbs: FirebaseService,
    private afs: Firestore
  ) { }

  resolve(): Promise<any> {
    return this.ss.loadState(
      this.getServerSideProps(),
      'home'
    );
  }

  async getServerSideProps() {

    const ref = collectionGroup(this.afs, 'posts');
    const postsQuery = query(
      ref,
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(LIMIT),
    );

    const posts = (await getDocs(postsQuery)).docs.map(this.fbs.postToJSON);

    return { posts }; // will be passed to the page component as props
  }
}
