import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { UserRole } from '../../../../../shared/src/lib/models/user.model';
import { TechnologyDTO } from '../../../../../shared/src/lib/models/technology.model';


const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  constructor(private http: HttpClient) {}

  getAllTechnologies(): Observable<TechnologyDTO[]> {
    return this.http.get<TechnologyDTO[]>(`${baseUrl}/technologies`, { withCredentials: true });
  }


  createDraftTechnology(technology: TechnologyDTO): Observable<TechnologyDTO> {
    return this.http.post<TechnologyDTO>(`${baseUrl}/technologies/draft`,technology, { withCredentials: true });
  }

  createAndPublishTechnology(technology: TechnologyDTO): Observable<TechnologyDTO> {
    return this.http.post<TechnologyDTO>(`${baseUrl}/technologies`,technology, { withCredentials: true });
  }
}
