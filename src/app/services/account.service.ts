import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  token?: string;
}

export const environment = {
  apiUrl: 'http://localhost:3000',
};

@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user: Observable<User | null> = this.userSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    // const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    // this.userSubject.next(storedUser);
  }

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.getAll().pipe(
      map((users: User[]) => {
        console.log(users,"users");
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        }
        throw new Error('Invalid username or password');
      })
    );
  }

  // login(username: string, password: string): Observable<User> {
  //   return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
  //     .pipe(
  //       map((user) => {
  //         console.log(user,"login")
  //         // localStorage.setItem('user', JSON.stringify(user));
  //         this.userSubject.next(user);
  //         return user;
  //       })
  //     );
  // }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users`, user);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  // getById(id: string): Observable<User> {
  //   return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  // }

  // update(id: string, params: any): Observable<any> {
  //   const shouldUpdateLocalStorage = id === this.userValue?.id;

  //   return this.http.put(`${environment.apiUrl}/users/${id}`, params)
  //     .pipe(
  //       map((x) => {
  //         if (shouldUpdateLocalStorage) {
  //           const user = { ...this.userValue, ...params };
  //           localStorage.setItem('user', JSON.stringify(user));
  //           this.userSubject.next(user);
  //         }
  //         return x;
  //       })
  //     );
  // }

  delete(id: string): Observable<any> {
    const shouldLogout = id === this.userValue?.id;

    return this.http.delete(`${environment.apiUrl}/users/${id}`)
      .pipe(
        map((x) => {
          if (shouldLogout) {
            this.logout();
          }
          return x;
        })
      );
  }
}