import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Heroes } from '../interfaces/heroes';
import { environment } from '../../../environments/environments';
import { Observable, catchError, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private http = inject(HttpClient);
  private url = environment.baseUrl;
  constructor() { }

  getHeroes(): Observable<Heroes[]> {
    return this.http.get<Heroes[]>(`${this.url}/heroes`);
  }

  getHeroById(id: string): Observable<Heroes | null> {
    return this.http.get<Heroes>(`${this.url}/heroes/${id}`)
      .pipe(
        catchError(() => of(null))
      );
  }

  getSuggestions(query: string): Observable<Heroes[]> {
    return this.http.get<Heroes[]>(`${this.url}/heroes`)
      .pipe(
        map(heroes => heroes.filter(hero => hero.superhero.toLowerCase().includes(query.toLowerCase()))),
        catchError(() => of([]))
      );
  }

  addHero(hero: Heroes): Observable<Heroes> {
    return this.http.post<Heroes>(`${this.url}/heroes`, hero);
  }

  updateHero(hero: Heroes): Observable<Heroes> {
    if (!hero.id) throw Error('Heroe id is required');
    return this.http.patch<Heroes>(`${this.url}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete(`${this.url}/heroes/${id}`)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

}
