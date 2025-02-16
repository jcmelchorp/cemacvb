import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { User } from '../models/user.model';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-user-card',
  standalone:true,
  imports:[
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user!: User;
  @Input() isAdmin!: boolean;
  @Input() isOnline!: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
