import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { ChildrenOutletContexts, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { HeaderComponent } from "../header/header.component";
import { MatMenuModule } from '@angular/material/menu';
import { Menu } from '../../models/menu.model';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { User } from '../../auth/models/user.model';
import * as fromAuthSelectors from '../../store/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/states/app.state';
import { isDarkMode } from '../../store/selectors/config.selectors';
import { setDarkMode } from '../../store/actions/config.actions';

@Component({
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    AsyncPipe,
    HeaderComponent,
    SidenavComponent,
    NgClass,
    NgIf,
    FlexLayoutModule
  ],
  animations: [],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class NavigationComponent implements OnInit {
  private layoutService = inject(LayoutService);
  private router = inject(Router);
  
  isHandset$: Observable<boolean>;
  isDarkTheme!: Observable<boolean>;
  user$!: Observable<User>;
  isOnline$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  loading = false;

  constructor(
    private overlay: OverlayContainer,
    private store: Store<AppState>
  ) {
    this.router.events.subscribe(event => this.navigationInterceptor(event as RouterEvent));
    this.router.events.subscribe((event_2) =>
      this.navigationInterceptor(event_2 as RouterEvent)
    );
    this.isHandset$ = this.layoutService.isHandset$;
    this.isOnline$ = this.store.select(fromAuthSelectors.isOnline);
    this.user$ = this.store.select(fromAuthSelectors.selectUser);
    this.isAdmin$ = this.store.select(fromAuthSelectors.isAdmin);
  }

  ngOnInit(): void {
    this.isDarkTheme = this.store.select(isDarkMode);
    const isDark: boolean = JSON.parse(localStorage.getItem('rds-config-is-dark')!)||{};
    if (isDark) {
      this.store.dispatch(setDarkMode({ isDark: isDark }));
    }
    this.isDarkTheme.subscribe((isDark) => {
      if (isDark) {
        this.overlay.getContainerElement().classList.add('theme-alternate');
      } else {
        this.overlay.getContainerElement().classList.remove('theme-alternate');
      }
    });

  }
  
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    switch (true) {
      case event instanceof NavigationStart: {
        this.loading = true;
        break;
      }
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  }

}