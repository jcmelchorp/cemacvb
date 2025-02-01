import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from "@angular/core";
import { map, Observable } from "rxjs";
import { LayoutService } from "../../services/layout.service";
import { ThemeService } from "../../services/theme.service";
import { SubscriptionService } from "../../services/subscription.service";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe, NgClass, NgIf } from "@angular/common";
import { FlexLayoutModule } from "ngx-flexible-layout";
import { AuthService } from "../../auth/services/auth.service";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [NgIf,AsyncPipe, MatIconModule, MatToolbarModule, MatButtonModule, MatTooltipModule, AsyncPipe, FlexLayoutModule],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,


})
export class HeaderComponent {
    @Input() isHandset!: boolean | null;
    private layoutService = inject(LayoutService);
    public themeService = inject(ThemeService);
    private subscriptionService = inject(SubscriptionService);
    private _router = inject(Router);
    private authservice = inject(AuthService);
    isDarkTheme$!: Observable<boolean>;
    public isDarkTheme!: boolean;
    hide: boolean = false;
    constructor() {
        this.isDarkTheme$ = this.themeService.isThemeDark.pipe(map((isDark: boolean) => this.isDarkTheme = isDark));
    }

    showModal: boolean = false;

    toggleModal() {
        this.showModal = !this.showModal;
    }

    toggleDarkTheme(isDarkTheme: boolean) {
        // console.log(isDarkTheme)
        this.themeService.toggleDarkTheme();
    }
    toggleSidenavLeft($event: any) {
        this.layoutService.toggleSidenavLeft.emit($event);
    }
    ngOnDestroy() {
        this.subscriptionService.unsubscribeComponent$;
    }

    isAuthenticated() {
       return  this.authservice.isAuthenticated
    }

    async logOut(): Promise<void> {
        try {
          await this.authservice.logOut();
          this._router.navigateByUrl('/login');
        } catch (error) {
          console.log(error);
        }
      }
}