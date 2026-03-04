import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { RouterLink } from "@angular/router";
import { SuggestFriendsComponent } from "../../shared/components/suggest-friends/suggest-friends.component";
import { SinglePostComponent } from "../../shared/components/single-post/single-post.component";
import { CreatePostComponent } from "../../shared/components/create-post/create-post.component";
import { PostsService } from '../../core/services/posts/posts.service';
import { IPost } from '../../core/models/IPost/ipost.interface';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  imports: [RouterLink, SuggestFriendsComponent, SinglePostComponent, CreatePostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  activeButtonAsids = 'feed';
  private readonly postsService = inject(PostsService);
  private readonly platformId = inject(PLATFORM_ID);
  private refreshSub!: Subscription;
  private myPostsSub!: Subscription;
  private allPostsSub!: Subscription;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getToken();
    this.getAllPosts();
    //To Refresh Posts After any change
    this.refreshSub = this.postsService.refreshPosts$.subscribe(() => {
      this.getAllPosts();
    });
  }
  //inject service to get platformID

  getToken() {
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem('socialMediaToken');
      console.log('token: ', token);
      if (token) {
        let decodedToken = jwtDecode(token);
        console.log('decoded `token: ', decodedToken);
      }

    }
  }

  showFriends: boolean = false;
  noPosts: boolean = false;
  toggleShowFriends() {
    this.showFriends = !this.showFriends;
    console.log(this.showFriends);

  }

  //Global variable
  communityPostsList: IPost[] = [];
  isPostsLoading: boolean = false;
  getAllPosts() {
    this.isPostsLoading = true;
    this.activeButtonAsids = 'feed';

    this.allPostsSub = this.postsService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res);
        if (res.success) {
          this.communityPostsList = res.data.posts;
          this.isPostsLoading = false;

        }
      },
      error: (err) => {
        this.isPostsLoading = false;
        console.log(err);
      }
    });
  }

  getMyPost() {
    this.activeButtonAsids = 'myPosts';
    this.myPostsSub = this.postsService.getUserPosts().subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
          this.communityPostsList = res.data.posts;

        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy() {
    this.refreshSub?.unsubscribe();
    this.allPostsSub?.unsubscribe();
    this.myPostsSub?.unsubscribe();
  }
}
