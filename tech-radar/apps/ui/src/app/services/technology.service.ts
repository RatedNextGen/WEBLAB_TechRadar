import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { TechnologyDTO } from '../../../../../shared/src/lib/models/technology.model';


const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  private technologiesSubject = new BehaviorSubject<TechnologyDTO[]>([]);
  technologies$ = this.technologiesSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  getAllTechnologies(): Observable<TechnologyDTO[]> {
    return this.http.get<TechnologyDTO[]>(`${baseUrl}/technologies`, { withCredentials: true }).pipe(
      tap(technologies => this.technologiesSubject.next(technologies)));
  }


  createDraftTechnology(technology: TechnologyDTO): Observable<TechnologyDTO> {
    return this.http.post<TechnologyDTO>(`${baseUrl}/technologies/draft`, technology, { withCredentials: true }).pipe(
      tap((createdTech) => {
        const updatedTechnologies = [...this.technologiesSubject.getValue(), createdTech];
        this.technologiesSubject.next(updatedTechnologies); // ✅ Add the new technology
      })
    );
  }

  createAndPublishTechnology(technology: TechnologyDTO): Observable<TechnologyDTO> {
    return this.http.post<TechnologyDTO>(`${baseUrl}/technologies`, technology, { withCredentials: true }).pipe(
      tap((createdTech) => {
        const updatedTechnologies = [...this.technologiesSubject.getValue(), createdTech];
        this.technologiesSubject.next(updatedTechnologies); // ✅ Add the new technology
      })
    );
  }

  deleteTechnology(technologyId: string): Observable<TechnologyDTO> {
    return this.http.delete<TechnologyDTO>(`${baseUrl}/technologies/${technologyId}`, { withCredentials: true }).pipe(
      tap(() => {
        const updatedTechnologies = this.technologiesSubject
          .getValue()
          .filter(tech => tech._id !== technologyId); // ✅ Remove the deleted item
        this.technologiesSubject.next(updatedTechnologies); // ✅ Update the observable
      })
    );
  }
}
