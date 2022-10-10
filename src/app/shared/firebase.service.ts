import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, limit, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: Firestore) { }

  /**`
   * Gets a users/{uid} document with username
   * @param  {string} username
   */
  async getUserWithUsername(username: string) {
    // const usersRef = collection(firestore, 'users');
    // const query = usersRef.where('username', '==', username).limit(1);

    const q = query(
      collection(this.afs, 'users'),
      where('username', '==', username),
      limit(1)
    )
    const userDoc = (await getDocs(q)).docs[0];
    return userDoc;
  }

  /**`
   * Converts a firestore document to JSON
   * @param  {DocumentSnapshot} doc
   */
  postToJSON(doc: any) {
    const data = doc.data();
    return {
      ...data,
      // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data?.createdAt.toMillis() || 0,
      updatedAt: data?.updatedAt.toMillis() || 0,
    };
  }
}
