import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { UserInterface } from '../interfaces/user-interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private url = environment.baseUrl;
  private user?: UserInterface;
  constructor() { }

  get currentUser(): UserInterface | undefined {
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.url}/users/1`)
    .pipe(
      tap(user => this.user = user),
      tap(user => localStorage.setItem('token', 'sadadewq.adwqe2QWE.adweqwe')) 
    );
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthentication(): Observable<boolean>  {
    if (!localStorage.getItem('token'))   return of(false);
    const token = localStorage.getItem('token');

    return this.http.get<UserInterface>(`${this.url}/users/1`)
    .pipe(
      tap(user => this.user = user),
      map(user => !!user),
      catchError(() => of(false))
    );
  }
}
