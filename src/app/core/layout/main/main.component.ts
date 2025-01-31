import { Component, Input, OnInit } from '@angular/core';
import { ChildrenOutletContexts, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [ RouterOutlet],
  animations: [
    
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
 
 
  ngOnInit(): void {}
}
