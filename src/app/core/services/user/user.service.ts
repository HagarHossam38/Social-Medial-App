import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly platformId = inject(PLATFORM_ID);
  // headerToken: any;
  constructor() {
    //  this.setHeaderToken();
  }
  // setHeaderToken() {
  //   //3shan lw kona lsa na7yt el server (ssr)
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.headerToken = {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem('socialMediaToken')!}`
  //       }
  //     }
  //   }
  // }
  signOut() {
    //Remove Token
    localStorage.removeItem('socialMediaToken');
    localStorage.removeItem('loggedUserData');
    //Navigate to login page
    this.router.navigate(['/login'])
  }
  getFollowSuggestions(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}/users/suggestions?limit=10`);
  }
  getMyProfile(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}/users/profile-data`);
  }
  changeMyPassword(data: any): Observable<any> {
    return this.httpClient.patch(`${environment.baseURL}/users/change-password`, data);
  }
}
