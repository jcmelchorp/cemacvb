import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule } from '@angular/material/slide-toggle';
import { toggleDarkMode } from '../../store/actions/config.actions';
import { AppState } from '../../store/states/app.state';
import { isDarkMode } from '../../store/selectors/config.selectors';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone:true,
  imports:[
    AsyncPipe,
    NgClass,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  defaultElevation = 4;
  raisedElevation = 6;

  langs!: string[];
  isDarkTheme$!: Observable<boolean>;
  isDarkTheme!: boolean;
  constructor(
    private store: Store<AppState>,
  ) {

  }
  ngOnInit(): void {
    this.isDarkTheme$ = this.store.select(isDarkMode).pipe(map(isDark => this.isDarkTheme = isDark));
  }

  toggleDarkTheme(isDarkTheme: boolean) {
    console.log(isDarkTheme)
    this.store.dispatch(toggleDarkMode({ isDark: isDarkTheme }));
  }

}
