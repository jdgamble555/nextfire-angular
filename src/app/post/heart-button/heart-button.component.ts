import { Component, Input, OnInit } from '@angular/core';
import { doc, docData, DocumentReference, Firestore, increment, writeBatch } from '@angular/fire/firestore';

@Component({
  selector: 'app-heart-button',
  templateUrl: './heart-button.component.html',
  styleUrls: ['./heart-button.component.scss']
})
export class HeartButtonComponent implements OnInit {

  @Input() user: any;
  @Input() postRef!: DocumentReference;

  heartDoc: any;
  heartRef!: DocumentReference;

  constructor(
    private afs: Firestore
  ) { }

  // Create a user-to-post relationship
  async addHeart() {
    const batch = writeBatch(this.afs);

    batch.update(this.postRef, { heartCount: increment(1) });
    batch.set(this.heartRef, { uid: this.user.uid });

    await batch.commit();
  }

  // Remove a user-to-post relationship
  async removeHeart() {
    const batch = writeBatch(this.afs);

    batch.update(this.postRef, { heartCount: increment(-1) });
    batch.delete(this.heartRef);

    await batch.commit();
  }

  ngOnInit(): void {
    this.heartRef = doc(this.afs, this.postRef.path, 'hearts', this.user.uid);
    this.heartDoc = docData(this.heartRef);
  }

}
