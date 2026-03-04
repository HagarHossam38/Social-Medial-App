import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router)
  signUp(data: any): Observable<any> {
    return this.httpClient.post(environment.baseURL + '/users/signup', data)
  }
  signIn(data: any): Observable<any> {
    return this.httpClient.post(environment.baseURL + '/users/signin', data);
  }



}
