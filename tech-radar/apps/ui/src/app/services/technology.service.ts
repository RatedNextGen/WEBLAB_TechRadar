import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { TechnologyDTO } from '../../../../../shared/src/lib/models/technology.model';
import { baseUrl } from '../pages/utils/constants';

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


  createDraft(technology: TechnologyDTO): Observable<TechnologyDTO> {
    return this.http.post<TechnologyDTO>(`${baseUrl}/technologies/draft`, technology, { withCredentials: true }).pipe(
      tap((createdTech) => {
        const updatedTechnologies = [...this.technologiesSubject.getValue(), createdTech];
        this.technologiesSubject.next(updatedTechnologies);
      })
    );
  }

  create(technology: TechnologyDTO): Observable<TechnologyDTO> {
    return this.http.post<TechnologyDTO>(`${baseUrl}/technologies`, technology, { withCredentials: true }).pipe(
      tap((createdTech) => {
        const updatedTechnologies = [...this.technologiesSubject.getValue(), createdTech];
        this.technologiesSubject.next(updatedTechnologies);
      })
    );
  }

  updateDraft(technology: TechnologyDTO): Observable<TechnologyDTO> {
    return this.http.put<TechnologyDTO>(
      `${baseUrl}/technologies/draft/${technology._id}`,
      technology,
      { withCredentials: true }
    ).pipe(
      tap(updatedTech => this.updateTechnologyInSubject(updatedTech))
    );
  }

  updateDraftAndPublish(technology: TechnologyDTO): Observable<TechnologyDTO> {
    return this.http.put<TechnologyDTO>(
      `${baseUrl}/technologies/draft/${technology._id}/publish`,
      technology,
      { withCredentials: true }
    ).pipe(
      tap(updatedTech => this.updateTechnologyInSubject(updatedTech))
    );
  }

  update(technology: TechnologyDTO): Observable<TechnologyDTO> {
    return this.http.put<TechnologyDTO>(
      `${baseUrl}/technologies/${technology._id}`,
      technology,
      { withCredentials: true }
    ).pipe(
      tap(updatedTech => this.updateTechnologyInSubject(updatedTech))
    );
  }

  deleteTechnology(technologyId: string): Observable<TechnologyDTO> {
    return this.http.delete<TechnologyDTO>(`${baseUrl}/technologies/${technologyId}`, { withCredentials: true }).pipe(
      tap(() => {
        const updatedTechnologies = this.technologiesSubject
          .getValue()
          .filter(tech => tech._id !== technologyId);
        this.technologiesSubject.next(updatedTechnologies);
      })
    );
  }

  private updateTechnologyInSubject(updatedTech: TechnologyDTO): void {
    const currentTechs = this.technologiesSubject.getValue();
    const index = currentTechs.findIndex(tech => tech._id === updatedTech._id);
    if (index !== -1) {
      currentTechs[index] = updatedTech;
    } else {
      currentTechs.push(updatedTech);
    }
    this.technologiesSubject.next([...currentTechs]);
  }
}
