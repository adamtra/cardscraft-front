import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PlayerData } from 'src/app/interfaces';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  public me: PlayerData;
  public enemy: PlayerData;
  public manaMax = 8;

  constructor() { }

  ngOnInit() {
    this.me = {
      cards: [6, 7, 8, 10, 12],
      health: 30,
      mana: 3
    };
    this.enemy = {
      cards: [0, 0],
      health: 30,
      mana: 2,
    };
  }

  drop(event: CdkDragDrop<number[]>) {
    moveItemInArray(this.me.cards, event.previousIndex, event.currentIndex);
  }

}
