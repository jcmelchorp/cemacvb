import { Component, inject, Input, ViewChild } from "@angular/core";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { LayoutService } from "../../services/layout.service";
import { MatMenuModule } from "@angular/material/menu";
import { HeaderComponent } from "../header/header.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule, MatNavList } from "@angular/material/list";
import { AsyncPipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MainComponent } from "../main/main.component";
import { FooterComponent } from "../footer/footer.component";
import { MatLineModule } from "@angular/material/core";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { Menu } from "../../models/menu.model";


@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [
    MainComponent,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatNavList,
    RouterModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatLineModule,
    FlexLayoutModule
  ],
  animations: [],
})
export class SidenavComponent {
  private layoutService = inject(LayoutService);
  @ViewChild('leftSidenav') sidenavLeft!: MatSidenav;
  @Input() isHandset!: boolean;
  onSideNavChange!: boolean;
  panelOpenState = false;
  mobileQuery!: MediaQueryList;
  linkText: boolean = false;
  sideNavState: boolean = false;
  loading = false;

  routes:Menu=[ 
    { title: 'Inicio', link:'/', icon: 'home' },
    { title: 'Inscripciones', link: '/inscription', icon: 'person_add' },
    { title: 'Nosotros', link:'/about', icon: 'about' },
    { title: 'Preguntas', link:'/faq', icon: 'question_mark' },

  ];
  
  constructor(
  ) {
    this.layoutService.toggleSidenavLeft.subscribe(() => {
      this.sidenavLeft.toggle();
    });
    this.layoutService.sideNavState$.subscribe((state: boolean) => {
      this.onSideNavChange = state;
    });
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 10);
    this.layoutService.sideNavState$.next(this.sideNavState);
  }
}