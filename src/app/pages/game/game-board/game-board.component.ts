import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PlayerData } from 'src/app/interfaces';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @Output() leaveGame = new EventEmitter();

  public me: PlayerData;
  public enemy: PlayerData;
  public manaMax = 8;

  constructor() { }

  ngOnInit() {
    this.me = {
      cards: [6, 7, 8, 10, 12],
      health: 30,
      mana: 3,
      played: [7],
    };
    this.enemy = {
      cards: [0, 0],
      health: 30,
      mana: 2,
      played: [6],
    };
  }

  escape() {
    this.leaveGame.emit();
  }

  drop(event: CdkDragDrop<number[]>) {
    moveItemInArray(this.me.cards, event.previousIndex, event.currentIndex);
  }

  playCard(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
