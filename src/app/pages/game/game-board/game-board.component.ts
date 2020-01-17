import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PlayerData, PlayedCard } from 'src/app/interfaces';
import { GameCardComponent } from '../game-card/game-card.component';
import { SharedStorage } from 'ngx-store';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy {

  @ViewChildren('myCard') myCards: QueryList<GameCardComponent>;
  @ViewChildren('played') myPlayed: QueryList<GameCardComponent>;
  @ViewChildren('enemyPlayed') enemyCards: QueryList<GameCardComponent>;

  @SharedStorage('roomId') roomId: string;

  @Output() leaveGame = new EventEmitter();

  public me: PlayerData;
  public enemy: PlayerData;
  public manaMax = 0;
  public myTurn = false;

  private subscriptions = new Subscription();

  constructor(private webSocket: WebSocketService) { }

  ngOnInit() {
    this.turn();
    this.enemyPlayed();
    this.attack();
    this.playerAttacked();
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  turn() {
    this.subscriptions.add(this.webSocket.onMessage('turn').subscribe((data: any) => {
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
    }));
  }

  enemyPlayed() {
    this.subscriptions.add(this.webSocket.onMessage('putOnBoard').subscribe((data) => {
      this.enemy.played.push({
        id: data.card,
        disabled: true,
        health: 0,
      });
    }));
  }

  attack() {
    this.subscriptions.add(this.webSocket.onMessage('attack').subscribe((data) => {
      const {attacker, defender} = data;
      if (this.myTurn) {
        if (attacker.health <= 0) {
          this.me.played = this.me.played.filter((card) => card.id !== attacker.id);
        } else {
          const cardData = this.me.played.find((item) => item.id === attacker.id);
          cardData.health = attacker.health;
        }
        if (defender.health <= 0) {
          this.enemy.played = this.enemy.played.filter((card) => card.id !== defender.id);
        } else {
          const cardData = this.enemy.played.find((item) => item.id === defender.id);
          cardData.health = defender.health;
        }
      } else {
        if (attacker.health <= 0) {
          this.enemy.played = this.enemy.played.filter((card) => card.id !== attacker.id);
        } else {
          const cardData = this.enemy.played.find((item) => item.id === attacker.id);
          cardData.health = attacker.health;
        }
        if (defender.health <= 0) {
          this.me.played = this.me.played.filter((card) => card.id !== defender.id);
        } else {
          const cardData = this.me.played.find((item) => item.id === defender.id);
          cardData.health = defender.health;
        }
      }
    }));
  }

  playerAttacked() {
    this.subscriptions.add(this.webSocket.onMessage('playerAttacked').subscribe((data) => {
      if (this.me.health <= data) {
        this.escape();
      }
      this.me.health -= data;
    }));
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
          health: 0,
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
    const myCard = this.me.played.find((item) => item.id === prev.id);
    myCard.disabled = true;
    this.enemy.health -= cardData.cardData.damage;
    const msg = {
      room: this.roomId,
      attack: cardData.cardData.damage,
    };
    this.webSocket.send('attackPlayer', msg);
  }

  attackCard(event: CdkDragDrop<PlayedCard[]>, id: number) {
    const prev = event.previousContainer.data[event.previousIndex];
    const cardData = this.myPlayed.find((item) => item.id === prev.id);
    const myCard = this.me.played.find((card) => card.id === prev.id);
    const enemyCardData = this.enemyCards.find((item) => item.id === id);
    myCard.disabled = true;
    const msg = {
      room: this.roomId,
      attacker: {
        id: cardData.cardData.id,
        attack: cardData.cardData.damage,
        health: cardData.cardData.health,
      },
      defender: {
        id: enemyCardData.cardData.id,
        attack: enemyCardData.cardData.damage,
        health: enemyCardData.cardData.health,
      },
    };
    this.webSocket.send('attack', msg);
  }


}
