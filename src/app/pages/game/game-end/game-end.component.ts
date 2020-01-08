import { Component, OnInit } from '@angular/core';
import { SharedStorage } from 'ngx-store';

@Component({
  selector: 'app-game-end',
  templateUrl: './game-end.component.html',
  styleUrls: ['./game-end.component.scss']
})
export class GameEndComponent implements OnInit {

  @SharedStorage('gameEnd') gameEnd: string;
  
  constructor() { }

  ngOnInit() {
  }

}
