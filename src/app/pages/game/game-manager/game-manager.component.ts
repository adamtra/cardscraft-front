import { Component, OnInit, HostListener } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { SharedStorage } from 'ngx-store';

@Component({
  selector: 'app-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.scss']
})
export class GameManagerComponent implements OnInit {

  @SharedStorage('roomId') roomId: string;
  @SharedStorage('gameEnd') gameEnd: string;
  
  @HostListener('window:beforeunload')
  disconnect() {
    this.webSocket.send('leave', this.roomId);
  }
  
  public state = 2;

  constructor(private webSocket: WebSocketService) { }

  ngOnInit() {
    this.webSocket.connect();
    this.webSocket.onMessage('start').subscribe(() => {
      this.state = 2;
    });
    this.webSocket.onMessage('end').subscribe((data) => {
      this.gameEnd = data;
      this.state = 3;
    });
  }

  newGame() {
    this.state = 1;
  }

}
