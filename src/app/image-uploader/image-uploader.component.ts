import { Component } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../shared/user.service';

@Component({
  standalone: true,
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  imports: [
    SharedModule
  ]
})
export class ImageUploaderComponent {

  uploading = false;
  progress = '0';
  downloadURL: string | null = null;

  constructor(
    private afs: Storage,
    private us: UserService
  ) { }

  // Creates a Firebase Upload Task
  async uploadFile(e: any) {
    // Get the file
    const file = Array.from(e.target.files)[0] as any;
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    const fileRef = ref(this.afs, `uploads/${this.us.user?.uid}/${Date.now()}.${extension}`);
    this.uploading = true;

    // Starts the upload
    const task = uploadBytesResumable(fileRef, file)

    // Listen to updates to upload task
    task.on('state_changed', (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      this.progress = pct;
    });

    // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
    task
      .then(() => getDownloadURL(fileRef))
      .then((url: any) => {
        this.downloadURL = url;
        this.uploading = false;
      });
  }
}
