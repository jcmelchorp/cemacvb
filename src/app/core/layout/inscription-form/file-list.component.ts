import { Component, inject, OnInit, signal } from "@angular/core";
import { Storage,  getDownloadURL, listAll, ref } from "@angular/fire/storage";

type ImageStorage = {
    name: string;
    url: string;
  };
  
  @Component({
    selector: 'app-file-list',
    standalone: true,
    imports: [],
    template: `
      <div>
        @for (image of images(); track image) {
          <div class="mb-4">
            <p class="mb-4">{{ image.name }}</p>
            <picture>
              <img [src]="image.url" [alt]="image.name" loading="lazy" />
            </picture>
          </div>
        }
      </div>
    `,
    styles: ``,
  })
  export default class FileListComponent implements OnInit {
    private readonly _storage = inject(Storage);
  
    images = signal<ImageStorage[]>([]);
  
    async ngOnInit() {
      const reference = ref(this._storage, 'uploads');
      const images = await listAll(reference);
  
      for (const image of images.items) {
        const url = await getDownloadURL(image);
        this.images.update((oldImages) => {
          return [...oldImages, { url, name: image.name }];
        });
      }
  
      console.log(this.images());
    }
  }