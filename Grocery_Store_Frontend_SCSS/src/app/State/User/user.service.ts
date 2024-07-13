import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { BASE_API_URL } from 'src/app/config/api';
import { getUserProfileFailure, getUserProfileSuccess, logoutSuccess } from './user.action';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = BASE_API_URL + "/api";
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private store: Store) {
    // Initialize headers without token initially
    this.headers = new HttpHeaders();
  }

  getUserProfile() {
    const token = localStorage.getItem('jwt');
    if (token) {
      // Set Authorization header with token dynamically
      this.headers = this.headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get(`${this.apiUrl}/users/profile`, { headers: this.headers }).pipe(
      map((user: any) => {
        console.log('user profile success', user);
        return getUserProfileSuccess({ userProfile: user });
      }),
      catchError((error) => {
        return of(
          getUserProfileFailure(
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          )
        );
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

  


  logout(){
    localStorage.removeItem("jwt");
    this.store.dispatch(logoutSuccess())
  }

}
