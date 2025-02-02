import { Component, HostListener, OnInit } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import regions from '../../../../assets/data/regions.json';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports:[MatIconModule,MatButtonModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  public filename: string = "regions_.json";
  new: {}[] = [];
  constructor(private sanitizer: DomSanitizer) { }
  // switchLang(lang: string) {
  //   this.translate.use(lang);
  // }
  // array: Region[] = regions as Region[];

  ngOnInit(): void {


  }

}


