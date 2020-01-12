import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { SharedStorage } from 'ngx-store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-begin',
  templateUrl: './game-begin.component.html',
  styleUrls: ['./game-begin.component.scss']
})
export class GameBeginComponent implements OnInit, OnDestroy {

  @SharedStorage('roomId') roomId: string;

  public message: any;

  private subscriptions = new Subscription();

  constructor(private webSocket: WebSocketService) { }

  ngOnInit() {
    this.connectToRoom();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  connectToRoom() {
    this.webSocket.send('join', localStorage.getItem('token'));
    this.subscriptions.add(this.webSocket.onMessage('joined').subscribe((data) => {
      this.message = data;
      this.roomId = data;
    }));
  }

}
