import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: any;

  constructor() { }

  connect() {
    this.socket = socketIo(environment.wsLink);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  send(method: string, message: any) {
    this.socket.emit(method, message);
  }

  onMessage(method: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(method, (data: any) => {
        observer.next(data);
      });
    });
  }

}
