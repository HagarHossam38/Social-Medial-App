import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../core/models/User/iuser.interface';
import { UserService } from '../../core/services/user/user.service';
import { PostsService } from '../../core/services/posts/posts.service';
import { Subscription } from 'rxjs';
import { IPost } from '../../core/models/IPost/ipost.interface';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  currentUser: IUser | null = null;
  currentUserPosts: IPost[] = [];
  private readonly userService = inject(UserService);

  private readonly postsService = inject(PostsService);
  private myPostsSub!: Subscription;

  isCoverImg: boolean = false;
  bgImage = '';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getMyProfile();
    this.getMyPosts();
  }

  isImgModal = false;


  getMyProfile() {
    this.userService.getMyProfile().subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
          this.currentUser = res.data.user;
          if (this.currentUser?.cover) {
            this.isCoverImg = true;
            this.bgImage = `linear-gradient(rgba(15, 23, 42, 0.22), rgba(15, 23, 42, 0.4)), url(${this.currentUser.cover})`;
            console.log(this.bgImage);
          }
          else {
            this.isCoverImg = false;
            this.bgImage = ``
          }
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  updateProfilePhoto() {

  }
  getMyPosts() {
    this.myPostsSub = this.myPostsSub = this.postsService.getUserPosts().subscribe({
      next: (res) => {
        if (res.success) {
          console.log(res);
          this.currentUserPosts = res.data.posts;

        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ngOnDestroy() {

    this.myPostsSub?.unsubscribe();
  }
}
