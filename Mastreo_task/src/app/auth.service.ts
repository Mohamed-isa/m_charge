import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://cbe.themaestro.in:8021'

  constructor(private http: HttpClient) {}

  // login(credentials: { email: string; password: string }): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('email', credentials.email);
  //   formData.append('password', credentials.password);
  //   // Append other fields if necessary, e.g., pincode, name, etc.

  //   return this.http.post(`${this.apiUrl}/api_mcharge_v2/signup`, formData, {
  //     headers: {
  //       'Accept': 'application/json' // Set the accept header
  //     }
  //   }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  login(credentials: { email: string; password: string }): Observable<any> {
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);
    formData.append('authcode', 'cbb702ffd29e8834c6f7deb0037e348da9f94856');
    formData.append('userName', credentials.email);
    formData.append('device_type', '1');

    // Append other fields if necessary, e.g., pincode, name, etc.

    return this.http.post(`${this.apiUrl}/api_mcharge_v2/login`, formData, {
      headers: {
        'Accept': 'application/json' // Set the accept header
      }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error); // Re-throw the error
  }
}
