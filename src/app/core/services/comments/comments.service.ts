import { platform } from 'os';
import { HttpClient } from '@angular/common/http';
import { enableProfiling, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  // headerToken: any;
  constructor() {
    //   this.setHeaderToken();
  }
  // setHeaderToken() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.headerToken = {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem('socialMediaToken')!}`
  //       }
  //     }
  //   }
  // }

  //=======================================
  //API Method
  getPostComments(postId: string | number): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}/posts/${postId}/comments?page=1&limit=10`);
  }
  createComment(postId: string | number, commentData: any): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}/posts/${postId}/comments`, commentData);
  }
  getTopComment(postId: string | number): Observable<any> {
    return this.httpClient.get(`${environment.baseURL}/posts/${postId}/comments?page=1&limit=10`);
  }

  deleteComment(postId: string | number, commentId: string | number): Observable<any> {
    //https://linked-posts.routemisr.com/comments/664d447dc99473930fa0ed94
    return this.httpClient.delete(`${environment.baseURL}/posts/${postId}/comments/${commentId}`)
  }
  updateComment(postId: string | number, commentId: string | number, data: any): Observable<any> {
    //https://linked-posts.routemisr.com/comments/664d447dc99473930fa0ed94
    return this.httpClient.put(`${environment.baseURL}/posts/${postId}/comments/${commentId}`, data)
  }

  //trigger refesh
  private readonly refreshPostComments = new Subject<void>();
  refreshComments$ = this.refreshPostComments.asObservable();
  triggerRefresh() {
    this.refreshPostComments.next();
  }
}
