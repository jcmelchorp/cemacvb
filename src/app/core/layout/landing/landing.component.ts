import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { hueRotateAnimation } from 'angular-animations';
import { FlexModule } from 'ngx-flexible-layout';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatIconModule,MatCardModule,MatButtonModule,RouterModule,FlexModule],
  animations:[
    hueRotateAnimation({ anchor: 'hueButton', duration: 5000 })
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent { 
  hueBtnState = false;
}
