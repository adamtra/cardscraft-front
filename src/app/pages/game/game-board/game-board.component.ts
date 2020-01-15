import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PlayerData, PlayedCard } from 'src/app/interfaces';
import { GameCardComponent } from '../game-card/game-card.component';
import { SharedStorage } from 'ngx-store';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @ViewChildren('myCard') myCards: QueryList<GameCardComponent>;
  @ViewChildren('played') myPlayed: QueryList<GameCardComponent>;

  @SharedStorage('roomId') roomId: string;

  @Output() leaveGame = new EventEmitter();

  public me: PlayerData;
  public enemy: PlayerData;
  public manaMax = 0;
  public myTurn = false;

  constructor(private webSocket: WebSocketService) { }

  ngOnInit() {
    this.turn();
    this.enemyPlayed();
    this.me = {
      cards: [],
      health: 30,
      mana: 0,
      played: [],
    };
    this.enemy = {
      cards: [],
      health: 30,
      played: [],
    };
  }

  turn() {
    this.webSocket.onMessage('turn').subscribe((data: any) => {
      this.myTurn = true;
      if (this.manaMax !== 10) {
        this.manaMax += 1;
      }
      this.me.mana = this.manaMax;
      let newCards: any[];
      if (data.hasOwnProperty('newCards')) {
        newCards = data.newCards;
      } else {
        newCards = data;
      }
      for (const card of newCards) {
        this.me.cards.push(card);
      }
      this.me.played.forEach((card) => {
        card.disabled = false;
      });
      this.enemy.played.forEach((card) => {
        card.disabled = false;
      });
    });
  }

  enemyPlayed() {
    this.webSocket.onMessage('putOnBoard').subscribe((data) => {
      this.enemy.played.push({
        id: data.card,
        disabled: true,
      });
    });
  }

  escape() {
    this.leaveGame.emit();
  }

  endTurn() {
    const msg = {
      room: this.roomId,
      token: localStorage.getItem('token'),
    };
    this.webSocket.send('endTurn', msg);
    this.myTurn = false;
  }

  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.me.cards, event.previousIndex, event.currentIndex);
    }
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
        const msg = {
          room: this.roomId,
          card: prev,
        };
        this.webSocket.send('putOnBoard', msg);
      }
    }
  }

  attackPlayer(event: CdkDragDrop<PlayedCard[]>) {
    const prev = event.previousContainer.data[event.previousIndex];
    const cardData = this.myPlayed.find((item) => item.id === prev.id);
    cardData.disabled = true;
    this.enemy.health -= cardData.cardData.damage;
  }

  attackCard(event: CdkDragDrop<PlayedCard[]>) {
    console.log(event);
  }


}
