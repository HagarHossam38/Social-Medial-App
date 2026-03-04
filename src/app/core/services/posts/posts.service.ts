import { IUser } from './../../models/User/iuser.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { isPlatformBrowser, JsonPipe } from '@angular/common';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  // headerToken: any;
  currentUser!: IUser;
  constructor() {
    // this.setHeaderToken();
    this.getUserData();
  }

  getUserData() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('loggedUserData');
      if (user) {
        this.currentUser = JSON.parse(user);
      }
    }
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


  getAllPosts(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}/posts`);
  }
  getUserPosts(): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}/users/${this.currentUser._id}/posts`);
  }
  createPost(data: any): Observable<any> {//data: post data => Content & img
    return this.httpClient.post(`${environment.baseURL}/posts`, data);
  }
  getSinglePost(postId: string | number): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}/posts/${postId}`);
  }

  deletePost(postId: string | number): Observable<any> {
    return this.httpClient.delete(`${environment.baseURL}/posts/${postId}`)
  }
  updatePost(postId: string | number, data: any): Observable<any> {
    return this.httpClient.put(`${environment.baseURL}/posts/${postId}`, data);
  }




  //trigger refesh

  private readonly refreshPostsSubject = new Subject<void>();
  refreshPosts$ = this.refreshPostsSubject.asObservable();
  triggerRefreshPosts() {
    this.refreshPostsSubject.next();
  }
}
