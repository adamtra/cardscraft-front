import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlBase = 'user';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<Token> {
    return this.http.post<Token>(`${environment.apiLink}${this.urlBase}/login`, data);
  }

  register(data: any): Observable<string> {
    return this.http.post<string>(`${environment.apiLink}${this.urlBase}/register`, data);
  }

  check(): Observable<User> {
    return this.http.get<User>(`${environment.apiLink}${this.urlBase}/check`);
  }

  getMyAvatar(): Observable<Blob> {
    const options = { responseType: 'blob' as 'json' };
    return this.http.get<Blob>(`${environment.apiLink}${this.urlBase}/avatar`, options);
  }

  getAvatar(id: number): Observable<Blob> {
    const options = { responseType: 'blob' as 'json' };
    return this.http.get<Blob>(`${environment.apiLink}${this.urlBase}/${id}/avatar`, options);
  }

  setAvatar(file: File) {
    const uploadData = new FormData();
    if (file !== undefined) {
      uploadData.append('file', file, file.name);
    }
    return this.http.post<number>(`${environment.apiLink}${this.urlBase}/avatar`, uploadData);
  }

}
