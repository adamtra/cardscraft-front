import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PlayerData } from 'src/app/interfaces';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @ViewChildren('myCard') myCards: QueryList<GameCardComponent>;

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
      played: [{
        id: 7,
        disabled: false,
      }],
    };
    this.enemy = {
      cards: [0, 0],
      health: 30,
      played: [{
        id: 6,
        disabled: false,
      }],
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
      const prev = event.previousContainer.data[event.previousIndex];
      const cardData = this.myCards.find((item) => item.id === prev);
      const cost = cardData.cardData.manaCost;
      if (this.me.mana >= cost) {
        this.me.mana -= cost;
        this.me.cards.splice(event.previousIndex, 1);
        this.me.played.push({
          id: prev,
          disabled: true,
        });
      }
    }
  }

}
