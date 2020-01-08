import { Component, OnInit, HostListener } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-game-manager',
  templateUrl: './game-manager.component.html',
  styleUrls: ['./game-manager.component.scss']
})
export class GameManagerComponent implements OnInit {

  @HostListener('window:beforeunload')
  disconnect() {
    this.socket.send('leave', null);
  }
  
  public state = 1;

  constructor(private socket: WebSocketService) { }

  ngOnInit() {

  }

}
