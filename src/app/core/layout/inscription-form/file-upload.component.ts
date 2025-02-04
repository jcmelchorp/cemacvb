import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  percentage,
} from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  template: `
    <div>
      <div>
        <label for="filePicker">Choose or drag a file:</label><br />
        <input
          type="file"
          id="filePicker"
          (change)="handleFileSelect($event)"
        />
      </div>
      <!-- <br>
    <div>
        <h1>Base64 encoded version</h1>
        <textarea id="base64textarea" placeholder="Base64 will appear here" cols="50" rows="15">{{this.base64textString|async}}</textarea>
    </div> -->
      <br />
      <img [src]="imageSource | async" alt="Image Source" />
    </div>
  `,
  standalone: true,
  imports: [AsyncPipe],
})
export default class FileUploadComponent {
  progress = signal('0%');
  base64textString: BehaviorSubject<string> = new BehaviorSubject('');
  imageSource: BehaviorSubject<any> = new BehaviorSubject({});

  file!: File;

  private readonly _storage = inject(Storage);

  susbscription: Subscription | undefined = undefined;

  constructor(private sanitizer: DomSanitizer) {}

  changeInput(event: Event) {
    console.log(this._storage);
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.file = input.files[0];

      //this.uploadFile();
    }
  }

  handleFileSelect(evt: any) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString.next(btoa(binaryString));
    this.imageSource.next(
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64, ${btoa(binaryString)}`
      )
    );
    console.log(btoa(binaryString));
  }
  uploadFile() {
    const storageRef = ref(this._storage, `uploads/${this.file.name}`);
    const task = uploadBytesResumable(storageRef, this.file);

    if (this.susbscription) {
      this.susbscription.unsubscribe();
      this.susbscription = undefined;
    }

    this.susbscription = percentage(task).subscribe(({ progress }) => {
      this.progress.set(`${progress}%`);
    });
  }
}
