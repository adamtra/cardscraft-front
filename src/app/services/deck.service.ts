import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Deck, Card } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private urlBase = 'deck';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Deck[]> {
    return this.http.get<Deck[]>(`${environment.apiLink}${this.urlBase}`);
  }

  get(id: number): Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.apiLink}${this.urlBase}/${id}/cards`);
  }

}
