import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { UserRole } from '../../../../../shared/src/lib/models/user.model';
import { baseUrl } from '../pages/utils/constants';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private cachedRole: UserRole | null = null;

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${baseUrl}/auth/login`, { email, password }, {
      withCredentials: true
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${baseUrl}/auth/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.clearAuthCache()));
  }

  getUserRole(): Observable<{ role: string }> {
    if (this.isAuthenticated && this.cachedRole) {
      return of({ role: this.cachedRole });
    }

    return this.http.get<{ role: string }>(`${baseUrl}/auth/tokenInfo`, { withCredentials: true })
      .pipe(tap(response => {
        this.isAuthenticated = true;
        this.cachedRole = response.role as UserRole;
      }),
      catchError(() => {
        this.clearAuthCache();
        return throwError(() => new Error('Authentication failed'));
      })
    );
  }

  clearAuthCache(): void {
    this.isAuthenticated = false;
    this.cachedRole = null;
  }
}
