import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from '../interfaces';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private urlBase = 'card';

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Card> {
    return this.http.get<Card>(`${environment.apiLink}${this.urlBase}/${id}`);
  }

  getAll(): Observable<Card[]> {
    return this.http.get<Card[]>(`${environment.apiLink}${this.urlBase}`);
  }

  add(data: any): Observable<number> {
    return this.http.post<number>(`${environment.apiLink}${this.urlBase}`, data);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${environment.apiLink}${this.urlBase}/${id}`);
  }

}
