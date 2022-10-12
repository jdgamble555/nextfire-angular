import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from '@angular/fire/firestore';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router
} from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { StateService } from '../shared/state/state.service';

@Injectable({
  providedIn: 'root'
})
export class UsernameResolver implements Resolve<any> {

  constructor(
    private ss: StateService,
    private fbs: FirebaseService,
    private afs: Firestore,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    return this.ss.loadState(
      this.getServerSideProps({ urlQuery: route.params }),
      state.url
    );
  }

  async getServerSideProps({ urlQuery }: { urlQuery: any }) {

    const { username } = urlQuery;

    const userDoc = await this.fbs.getUserWithUsername(username);

    // If no user, short circuit to 404 page
    if (!userDoc) {
      this.router.navigate(['/404'], { skipLocationChange: true });
      return;
    }

    // JSON serializable data
    let user = null;
    let posts = null;

    if (userDoc) {
      user = userDoc.data();
      // const postsQuery = userDoc.ref
      //   .collection('posts')
      //   .where('published', '==', true)
      //   .orderBy('createdAt', 'desc')
      //   .limit(5);

      const postsQuery = query(
        collection(this.afs, userDoc.ref.path, 'posts'),
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      posts = (await getDocs(postsQuery)).docs.map(this.fbs.postToJSON);

    }
    return { user, posts }; // will be passed to the page component as props
  }
}
