import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { SharedStorage } from 'ngx-store';

@Component({
  selector: 'app-game-begin',
  templateUrl: './game-begin.component.html',
  styleUrls: ['./game-begin.component.scss']
})
export class GameBeginComponent implements OnInit {

  @SharedStorage('roomId') roomId: string;

  public message: any;

  constructor(private webSocket: WebSocketService) { }

  ngOnInit() {
    this.connectToRoom();
  }

  connectToRoom() {
    this.webSocket.send('join', localStorage.getItem('token'));
    this.webSocket.onMessage('joined').subscribe((data) => {
      this.message = data;
      this.roomId = data;
    });
  }

}