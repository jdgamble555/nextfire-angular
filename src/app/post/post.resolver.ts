import { Injectable } from '@angular/core';
import {
  doc,
  Firestore,
  getDoc
} from '@angular/fire/firestore';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { StateService } from '../shared/state/state.service';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<any> {

  constructor(
    private ss: StateService,
    private fbs: FirebaseService,
    private afs: Firestore
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    return this.ss.loadState(
      this.getServerSideProps({ params: route.params }),
      state.url
    );
  }

  async getServerSideProps({ params }: { params: any }) {

    const { username, slug } = params;
    const userDoc = await this.fbs.getUserWithUsername(username);

    let post;
    let path;

    if (userDoc) {
      // const postRef = userDoc.ref.collection('posts').doc(slug);
      const postRef = doc(this.afs, userDoc.ref.path, 'posts', slug);

      // post = postToJSON(await postRef.get());
      post = this.fbs.postToJSON(await getDoc(postRef));

      path = postRef.path;
    }

    return { post, path };
    //revalidate: 5000
  }
}

/*
export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const q = query(
    collectionGroup(getFirestore(), 'posts'),
    limit(20)
  )
  const snapshot = await getDocs(q);

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  };
}

*/
