import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${baseUrl}/auth/login`, { email, password }, {
        withCredentials: true
      });
  }

  logout(): Observable<any> {
    return this.http.post(`${baseUrl}/auth/logout`, {}, {
      withCredentials: true
    });
  }

  getUserRole(): Observable<{ role: string }> {
    return this.http.get<{ role: string }>(`${baseUrl}/auth/tokenInfo`, { withCredentials: true });
  }
}
