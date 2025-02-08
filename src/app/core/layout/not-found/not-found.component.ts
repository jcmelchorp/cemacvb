import { Component, HostListener, OnInit } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import regions from '../../../../assets/data/regions.json';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports:[MatCardModule,MatIconModule,MatButtonModule,RouterLink],
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


