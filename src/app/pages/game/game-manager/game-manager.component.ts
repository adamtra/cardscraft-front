import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { SharedStorage } from 'ngx-store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.scss']
})
export class GameManagerComponent implements OnInit, OnDestroy {

  @SharedStorage('roomId') roomId: string;
  @SharedStorage('gameEnd') gameEnd: string;

  public state = 1;

  private subscriptions = new Subscription();

  @HostListener('window:beforeunload')
  disconnect() {
    this.webSocket.send('leave', this.roomId);
  }

  constructor(private webSocket: WebSocketService) { }



  ngOnInit() {
    this.webSocket.connect();
    this.subscriptions.add(this.webSocket.onMessage('start').subscribe((data) => {
      this.roomId = data;
      this.state = 2;
    }));
    this.subscriptions.add(this.webSocket.onMessage('end').subscribe((data) => {
      this.gameEnd = data;
      this.state = 3;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.webSocket.disconnect();
  }

  newGame() {
    this.state = 1;
  }

}
