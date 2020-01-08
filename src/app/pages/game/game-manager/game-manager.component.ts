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
  
  @HostListener('window:beforeunload')
  disconnect() {
    this.webSocket.send('leave', this.roomId);
  }
  
  public state = 1;

  constructor(private webSocket: WebSocketService) { }

  ngOnInit() {
    this.webSocket.connect();
    this.webSocket.onMessage('start').subscribe(() => {
      this.state = 2;
    });
  }

}
