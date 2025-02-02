import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { hueRotateAnimation } from 'angular-animations';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatButtonModule,RouterModule],
  animations:[
    hueRotateAnimation({ anchor: 'hueButton', duration: 20000 })
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent { 
  hueBtnState = false;
}
